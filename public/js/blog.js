$(document).ready(function() {
    $("#create-blog-form").on('submit', function(event) {
        event.preventDefault();

        var formData = {
            title: $("#blog-title").val().trim(),
            content: $("#blog-content").val().trim(),
        };

        $.ajax({
            url: '/api/blogs',
            type: 'POST',
            data: formData,
            success: function(response) {
                // Redirect or show a success message
                location.reload();
            },
            error: function(err) {
                // Handle error
                alert("Error creating blog post!");
            }
        });
    });
});
