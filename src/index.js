const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash')

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(flash());
app.engine(
    ".hbs",
    exphbs.engine({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
    })
);
app.set('trust proxy', true);
app.use(session({
    secret: 'deobledigital',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    app.locals.success = req.flash("success");
    app.locals.message = req.flash("message");
    next();
});
app.set("view engine", ".hbs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", require("./routes/index"));
app.use((req,res)=>{
    res.redirect("/Error404");
})

app.listen(app.get('port'));
console.log('server on port', app.get('port'));

let hbs = exphbs.create({});

hbs.handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});
