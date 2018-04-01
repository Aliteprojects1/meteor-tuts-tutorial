const AllowedPostType = ['Nature', 'Psychology', 'Music', 'Programming', 'Project Management', 'Other'];


const PostType = [{label: 'Select type', value: ""}];
AllowedPostType.forEach(function (type) {
    PostType.push({label: type, value: type})
});

export {
    PostType,
    AllowedPostType
}