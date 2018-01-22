const BASE = "http://localhost:8080"
const POSTS_API = "/api/posts";

var PostTopic = React.createClass({
    render: function() {
        return (
            <td>
                <span><a href={'/posts/' + this.props.post.id}>{this.props.post.topic}</a></span>
                <div>
                    <span>by {this.props.post.owner} {this.props.post.lastModified}</span>
                </div>
            </td>
        )
    }
});

var LatestPost = React.createClass({
    render: function() {
        return (
            <td>
                <span>by {this.props.post.latestPostBy}</span>
                <div>
                    <span>{this.props.post.latestPost}</span>
                </div>
            </td>
        )
    }
});

var PostReplies = React.createClass({
    render: function() {
        return (
            <td>{this.props.post.replies}</td>
        )
    }
});


var PostTableRow = React.createClass({
    render: function() {
        return (
            <tr>
                <PostTopic post={this.props.post} />
                <LatestPost post={this.props.post} />
                <PostReplies post={this.props.post} />
             </tr>
        )
    }
});

var PostsTable = React.createClass({
    render: function() {
        var rows = [];

        this.props.posts.forEach(function(post) {
            console.log(post);
            rows.push(<PostTableRow key={post.id} post={post} />);
        });

        return (
            <table className="table table-striped table-dark table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Topic</th><th>Latest Post</th><th>Replies</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var NewDiscussionButton = React.createClass({
    getInitialState: function () {
        return {
            topic: '',
            comment: '',
        };
    },

    onNewDiscussionTopicChange: function(event) {
        this.setState({topic: event.target.value});
    },

    onNewDiscussionCommentChange: function(event) {
        this.setState({comment: event.target.value})
    },

    models: [],

    // create POST
    createPost: function() {
        return $.ajax({
            context: this,
            url: "http://localhost:8080/api/posts",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify( { "topic": this.state.topic } ),
            processData: false,
            success: function( data, textStatus, jQxhr ){
                this.models.push(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
       })
    },

    createComment: function() {
        return $.ajax({
            context: this,
            url: "http://localhost:8080/api/comments",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify( { "text": this.state.comment } ),
            processData: false,
            success: function( data, textStatus, jQxhr ){
                this.models.push(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
       })
    },

    associateComment: function() {
        return $.ajax({
            context: this,
            url: "http://localhost:8080/api/posts/" + this.models[0].id + "/comments",
            dataType: 'json',
            type: 'put',
            headers: {"Content-Type": "text/uri-list"},
            contentType: 'text',
            data: 'http://localhost:8080/comments/' + this.models[1].id,
            processData: false,
            success: function( data, textStatus, jQxhr ){
                this.models.push(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
       })
    },

    retrievePostSummary: function() {
        $.ajax({
            context: this,
            url: BASE + POSTS_API + '/' + this.models[0].id + '?projection=forumPostsSummary'
        }).then(function (data) {
            this.props.onAddDiscussion(data);
        });
    },

    save: function() {
        var that = this;

        return Promise.resolve()
            .then(function() {
                return that.createPost();
            })
            .then(function() {
                return that.createComment();
            })
            .then(function() {
                return that.associateComment();
            })
            .then(function() {
                console.log(" ---- Done creating new discussion ----");
                return that.retrievePostSummary();
            })
            .then(function() {
                $('#newDiscussionModal').modal('hide')
            });
    },

    render: function() {
        return (
            <div>
            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#newDiscussionModal">New discussion</button>
               <div className="modal fade" id="newDiscussionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="title">New discussion</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label for="topic-title" className="col-form-label">Title:</label>
                            <input type="text" className="form-control" id="topic-title" value={this.state.topic} onChange={this.onNewDiscussionTopicChange}/>
                          </div>
                          <div className="form-group">
                            <label for="topic-message" className="col-form-label">Message:</label>
                            <textarea className="form-control" id="topic-message" value={this.state.comment} onChange={this.onNewDiscussionCommentChange}></textarea>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.save}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
});

var PostDetails = React.createClass({
    getInitialState: function () {
        return {
            post: {}
        };
    },

    retrievePost: function() {
        var self = this;
        $.ajax({
            context: this,
            url: BASE + POSTS_API + '/' + this.props.postId
        }).then(function (data) {
            self.setState({post: data});
        });
    },

    componentDidMount: function () {
        this.retrievePost();
    },

    render: function() {
        return (
        <div className="modal fade" id="postDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="title">{this.state.post.topic}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="card">
                  <div class="card-header">
                    Quote
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        );
    }
});

var NavBar = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/posts">Simple Forum</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        );
    }
});

var Forum = React.createClass({

    getInitialState: function () {
        return {
            posts: []
        };
    },

    loadPostsFromServer: function () {
        var self = this;
        $.ajax({
            url: BASE + POSTS_API + '?projection=forumPostsSummary'
        }).then(function (data) {
            self.setState({posts: data._embedded.posts});
        });
    },

    componentDidMount: function () {
        this.loadPostsFromServer();
    },

    handleAddDiscussion: function (newDiscussion) {
        var arrayvar = this.state.posts.slice();
        arrayvar.push(newDiscussion);
        this.setState({ posts: arrayvar })
    },

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col"><NavBar /></div>
                </div>
                <div className="row">
                    <div className="col">&#160;</div>
                </div>
                <div className="row">
                    <div className="col align-self-end">
                        <NewDiscussionButton onAddDiscussion={this.handleAddDiscussion}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">&#160;</div>
                </div>
                <div className="row">
                    <div className="col"><PostsTable posts={this.state.posts}/></div>
                </div>
             </div>
        );
    }
});

ReactDOM.render(
    <Forum />, document.getElementById('forum')
);