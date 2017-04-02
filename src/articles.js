let nextArticleId = 4;
let nextCommentId = 1;

const sampleArticle = {
    '_id': 1,
    'text': 'stubbed article.',
    'date': '2015-08-20T15:10:38.309Z',
    'img': null,
    'comments': [],
    'author': 'stubbed john',
};

const sampleComment = {
    'commentId': 1,
    'author': 'stubbed john',
    'date': '2015-08-20T15:10:38.309Z',
    'text': 'stubbed comment.',
};

let articles = [
    {
        '_id': 1,
        'text': 'stubbed article.',
        'date': '2015-08-20T15:10:38.309Z',
        'img': null,
        'comments': [],
        'author': 'stubbed john',
    },
    {
        '_id': 2,
        'text': 'stubbed article.',
        'date': '2015-08-20T15:10:38.309Z',
        'img': null,
        'comments': [],
        'author': 'stubbed ann',
    },
    {
        '_id': 3,
        'text': 'stubbed article.',
        'date': '2015-08-20T15:10:38.309Z',
        'img': null,
        'comments': [],
        'author': 'stubbed joe',
    },
];

const getArticles = (req, res) => {
    if (req.params.id) {
        res.send(articles.filter(function(el) {
            return el._id == req.params.id || el.author == req.params.id;
        }))
    } else {
        res.send({'articles': articles})
    }
}

const putArticles = (req, res) => {

    const filteredArticles = articles.filter(function(el) {
        return el._id == req.params.id;
    })

    let article;
    if (filteredArticles.length > 0) {
        article = filteredArticles[0];
    }

    if (req.body.commentId == -1) {
        article.comments.push(Object.assign({}, sampleComment, {
            'commentId': nextCommentId,
            'text': req.body.text,
        }))
        nextCommentId += 1;
    } else {
        article.text = req.body.text;
    }

    res.send(articles);
}

const postArticle = (req, res) => {
    const newArticle = Object.assign({}, sampleArticle, {
        '_id': nextArticleId,
        'text': req.body.text,
    })
    articles.push(newArticle)

    nextArticleId += 1

	res.send(newArticle)
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles),
	app.put('/articles/:id', putArticles),
	app.post('/article', postArticle)
}

