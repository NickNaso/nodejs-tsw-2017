
document.addEventListener('DOMContentLoaded', function () {
    
    function BlogPost(post) {
        return  `<div class="col s12">
                    <h5>${post.title}</h5>
                    <h6>Author: <strong>${post.author}</strong></h6>
                    <p class="left-align light">
                    ${post.body}
                    </p>
                </div>`
    }
    
    function BlogPostList(posts) {
        return `<div class="row">
                    ${posts.map(BlogPost).join('')}
                </div>`
    }

    function BlogPostCtrl () {
        this._el = $('#blog-list')
        this._posts = []
        this._httpClient = axios
        this._BlogPostList = BlogPostList
        this._BlogPost = BlogPost
    }

    BlogPostCtrl.prototype.getPosts = function getPosts () {
        this._httpClient
        .get('/api/posts')
        .then((res) => {
            this._posts = res.data
            this.render()
        })
        .catch((err) => {
            console.error(err)
            alert('Error retrieving blog posts')
        })
    }

    BlogPostCtrl.prototype.render = function render () {
        this._el.html(this._BlogPostList(this._posts))
    }
    
    let blogCtrl = new BlogPostCtrl()
    blogCtrl.getPosts()
  
  })