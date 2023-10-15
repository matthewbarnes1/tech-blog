document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', async event => {
        let blogElement;

        if (event.target.matches('.btn-edit')) {
            blogElement = event.target.closest('.blog-card');
            if (!blogElement) {
                console.error("Couldn't find parent .blog-post element");
                return;
            }
            const blogId = blogElement.getAttribute('data-blog-id');
            window.location.href = `/edit-blog/${blogId}`;
        } 
        else if (event.target.matches('.btn-delete')) {
            blogElement = event.target.closest('.blog-card');
            if (!blogElement) {
                console.error("Couldn't find parent .blog-post element");
                return;
            }
            const blogId = blogElement.getAttribute('data-blog-id');
            const response = await fetch(`/api/blogs/delete-blog/${blogId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                blogElement.remove();
            } else {
                alert('Failed to delete blog post.');
            }
        }
    });
});
