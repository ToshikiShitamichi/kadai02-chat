const quill = new Quill('#editor', {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['link', { 'list': 'ordered' }, { 'list': 'bullet' }],
            ['code-block'],
        ],
    },
    placeholder: 'スレッドへのメッセージ',
    theme: 'snow', // or 'bubble'
});