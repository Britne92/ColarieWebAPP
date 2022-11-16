const e = require('express');
const fs = require('fs');
const path = require('path');
const cart = require('../controller/shoppingCart')

let json = fs.readFileSync(path.join(__dirname, '../database/packages.json'));

function user(string) {
    cart.user(string);
}

function itemsCart() {
    const aux = cart.getSize();
    return aux;
}

function deleteList(){
    cart.deleteList();
}

function total() {
    const aux = cart.total();
    return aux;
}

function addItem(item, cont) {
    item.cont = cont;
    cart.addItem(getItem(item), cont);
}

async function getListItemsCart() {
    const aux = await cart.getList()
    return aux;
}

function getItem(itemAux) {
    const packages = convert();
    let result = null;
    for (let i = 0; i < packages.length; i++) {
        if (itemAux == link(packages[i].cantidad, packages[i].nombre)) {
            result = packages[i];
        }
    }
    return result;
}

function convert() {
    const array = [];
    let parse = JSON.parse(json);
    for (var i in parse) {
        array.push(i, parse[i]);
    }
    return array;
}

function category(social,text) {
    const list = packages();
    for (let i = 0; i < list.length; i++) {
        if(social == list[i].socialMedia && text == list[i].categoryLink){
            return list[i];
        }
    }
    return "";
}

function packages() {
    const list = [];
    const packages = convert();
    for (let i = 0; i < packages.length; i++) {
        if (list.length == 0) {
            const aux = {
                socialMedia: packages[i].redSocial,
                category: packages[i].categoria,
            }
            list.push(aux);
        } else {
            var value = false;
            for (let j = 0; j < list.length; j++) {
                if (packages[i].redSocial == list[j].socialMedia && packages[i].categoria == list[j].category) {
                    value = true;
                }
            }
            if (value == false) {
                const aux = {
                    socialMedia: packages[i].redSocial,
                    category: packages[i].categoria,
                    categoryLink: link("categoria", packages[i].categoria),
                    link: link(packages[i].cantidad, packages[i].nombre)
                }
                list.push(aux);
            }
        }
    }
    return list;
}

function socialMedia(social) {
    const socialMedia = [];
    const packages = convert();
    for (var i in packages) {
        if (packages[i].redSocial == social) {
            packages[i].link = link(packages[i].cantidad, packages[i].nombre)
            packages[i].categoriaLink = link("categoria", packages[i].categoria)
            socialMedia.push(packages[i]);
        }
    }
    return socialMedia;
}

function socialMediaCategory(social, category) {
    const socialMedia = [];
    const packages = convert();
    for (var i in packages) {
        if (packages[i].redSocial == social && link("categoria", packages[i].categoria) == category) {
            packages[i].link = link(packages[i].cantidad, packages[i].nombre)
            packages[i].categoriaLink = link("categoria", packages[i].categoria)
            socialMedia.push(packages[i]);
        }
    }
    return socialMedia;
}

function link(cantidad, nombre) {
    let aux = "";
    if (cantidad == "categoria") {
        aux = nombre;
    } else {
        aux = cantidad + " " + nombre;
    }
    return aux.replace(/ /g, "-");
}

function removeItem(link) {
    let aux = cart.removeItem(link);
    return aux;
}

function package(link) {
    const packages = convert();
    for (var i in packages) {
        if (packages[i].link == link) {
            return packages[i];
        }
    }
    return null;
}

function redSocial(social) {
    const redSocial = {
        fondo: "",
        item: "",
        nombre: "",
        link: ""
    };
    if (social == "facebook") {
        redSocial.fondo = "/img/socialmedia/page-facebook.png",
            redSocial.item = "https://www.freepik.es/fotos-premium/camiseta-blanco-jeans-zapatillas-hoja-carton-sobre-fondo-amarillo_22136649.htm#query=fondo%20ropa&position=41&from_view=keyword",
            redSocial.nombre = "Ropa";
            redSocial.link = social;
    } else if (social == "instagram") {
        redSocial.fondo = "/img/socialmedia/instagram.jpg",
            redSocial.item = "https://www.freepik.es/foto-gratis/productos-accesorios-cosmeticos-belleza_9062563.htm#query=accesorios&position=0&from_view=keyword",
            redSocial.nombre = "Accesorios";
            redSocial.link = social;
           redSocial.link = social;
    }
    return redSocial;
}

function item(social, category, item) {
    const socialItems = socialMediaCategory(social, category);
    for (var i in socialItems) {
        if (socialItems[i].redSocial == social) {
            if (socialItems[i].link == item) {
                return socialItems[i];
            }
        }
    }
    return false;
}

module.exports = {
    user, package, redSocial, socialMedia, item, itemsCart, addItem, getListItemsCart, total, removeItem, packages, category, socialMediaCategory ,deleteList
}