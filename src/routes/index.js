const { Router } = require('express');
const router = Router();
const functions = require("../controller/function");
const newMail = require("../controller/mail");
const confirm = require("../controller/confirm")
const { v4: uuidv4 } = require('uuid');
var reference = "";

router.get("/", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const total = functions.total();
    const ItemsCart = await functions.getListItemsCart();
    res.render("pages/index.hbs", { total, ItemsCart, totalItems });
});

router.get("/acepted/payment", async (req, res) => {
    functions.user(req.sessionID);
    const ItemsCart = await functions.getListItemsCart();
    const total = await functions.total();
    const splitAux = req.url.split("=");
    if (splitAux.length == 2) {
        await confirm.newMessage(req, ItemsCart, total, "payment", reference, splitAux[1]);
        await functions.deleteList();
        req.flash("success", "El pago se ha efectuado correctamente");
    }
    res.redirect("/");
});

router.get("/rejected/payment", async (req, res) => {
    req.flash("message", "El pago NO se ha completado");
    res.redirect("/");
});

router.get("/pending/payment", async (req, res) => {
    functions.user(req.sessionID);
    const ItemsCart = await functions.getListItemsCart();
    const total = await functions.total();
    const splitAux = req.url.split("=");
    if (splitAux.length == 2) {
        await confirm.newMessage(req, ItemsCart, total, "pending", reference, splitAux[1]);
        await functions.deleteList();
        req.flash("success", "El pago esta a la espera de confirmacion");
    }
    res.redirect("/");
});

router.get("/socialMedia", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const total = functions.total();
    const ItemsCart = await functions.getListItemsCart();
    res.render("pages/index2.hbs", { total, ItemsCart, totalItems });
});

router.get("/cart", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const ItemsCart = await functions.getListItemsCart();
    const total = functions.total();
    res.render("pages/cart.hbs", { total, ItemsCart, totalItems });
})

router.get("/cart/checkout", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const ItemsCart = await functions.getListItemsCart();
    const total = functions.total();
    reference = await uuidv4();
    res.render("pages/checkout.hbs", { total, ItemsCart, totalItems, reference });
})

router.post("/add/item/:social/:category/:item", async (req, res) => {
    functions.user(req.sessionID);
    const social = req.params.social;
    const item = req.params.item;
    const category = req.params.category;
    const resp = functions.addItem(item, req.body.cont);
    req.flash("success", "Paquete adicionado correctamente al carro de compras");
    res.redirect("/" + social + "/" + category + "/" + item)
})

router.get("/remove/item/:social/:category/:item", async (req, res) => {
    functions.user(req.sessionID);
    const social = req.params.social;
    const item = req.params.item;
    const category = req.params.category;
    functions.removeItem(item);
    req.flash("success", "Paquete eliminado correctamente del carro de compras");
    res.redirect("/" + social + "/" + category + "/" + item);
});

router.get("/remove/item1/:social/:item", async (req, res) => {
    functions.user(req.sessionID);
    const item = req.params.item;
    const aux = functions.removeItem(item);
    req.flash("success", "Paquete eliminado correctamente del carro de compras");
    res.redirect("/cart");
});

router.post("/checkout", async (req, res) => {
    functions.user(req.sessionID);
    const ItemsCart = await functions.getListItemsCart();
    const total = await functions.total();
    const reference = uuidv4();
    await newMail.mail(req, ItemsCart, total, "none", reference, 0);
    req.flash("success", "GRACIAS POR TU COMPRA, en las proximas 48 horas alguien de nuestro equipo se comunicara contigo.");
    functions.deleteList();
    res.redirect('/');
});

router.get("/help", async (req, res) => {
    const totalItems = functions.packages();
    functions.user(req.sessionID);
    const total = functions.total();
    const ItemsCart = await functions.getListItemsCart();
    const help = "help";
    res.render("pages/help.hbs", { total, ItemsCart, help, totalItems })
})

router.get("/terms", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const total = functions.total();
    const ItemsCart = await functions.getListItemsCart();
    const terms = "help";
    res.render("pages/terms.hbs", { total, ItemsCart, terms, totalItems })
})

router.get("/adviser/spain", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const total = functions.total();
    const ItemsCart = await functions.getListItemsCart();
    const adviser = "help";
    res.render("pages/adviser.hbs", { total, ItemsCart, adviser, totalItems })
})

router.get("/:social", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const socialMedia = functions.redSocial(req.params.social);
    const packageSocial = functions.socialMedia(req.params.social);
    const cantidad = packageSocial.length;
    const total = functions.total();
    res.render("pages/socialMedia.hbs", { socialMedia, packageSocial, cantidad, total, totalItems });
})

router.get("/:social/:category", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const socialMedia = functions.redSocial(req.params.social);
    const packageSocial = functions.socialMediaCategory(req.params.social, req.params.category);
    const cantidad = packageSocial.length;
    const total = functions.total();
    const category = functions.category(req.params.social, req.params.category);
    res.render("pages/socialMedia.hbs", { socialMedia, packageSocial, cantidad, total, totalItems, category });
})

router.get("/:social/:category/:item", async (req, res) => {
    functions.user(req.sessionID);
    const totalItems = functions.packages();
    const item = await functions.item(req.params.social, req.params.category, req.params.item);
    const ItemsCart = await functions.getListItemsCart();
    const total = functions.total();
    res.render("pages/item.hbs", { item, ItemsCart, total, totalItems });
})

module.exports = router;