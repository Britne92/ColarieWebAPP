const listUser = []
var userActual = "";

function user(string) {
    userActual = string;
    return string;
}

function newSession() {
    var res = false;
    var sessionTotal = {
        "list": [],
        "name": userActual,
        "i": 0
    }
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].name == userActual) {
            res = true
            sessionTotal = listUser[i];
        }
    }
    if (listUser.length == 0 || res == false) {
        sessionTotal.i = listUser.length;
        listUser.push(sessionTotal);
    }
    return sessionTotal;
}

function deleteList() {
    const session = newSession();
    for (let i = 0; i < listUser.length; i++) {
        if (session.name == listUser[i].name) {
            session.list = []
        }
    }
    listUser.splice(session.i, 1);
    listUser.push(session);
}

function getSize() {
    return list.length
}

function addItem(item, cont) {
    const session = newSession();
    const aux = {
        "nombre": item.nombre,
        "valorNuevo": item.valorNuevo,
        "cantidad": item.cantidad,
        "categoriaLink": link("categoria", item.categoria),
        "link": link(item.cantidad, item.nombre),
        "redSocial": item.redSocial,
        "cont": cont,
        "subtotal": cont * item.valorNuevo,
        "imagen": item.imagen
    }
    session.list = existItem(aux);
    listUser.splice(session.i, 1);
    listUser.push(session);
}

function link(cantidad, nombre) {
    let aux = "";
    if ("categoria" == cantidad) {
        aux = nombre
    } else {
        aux = cantidad + " " + nombre;
    }
    return aux.replace(/ /g, "-");
}

function removeItem(link) {
    const session = newSession(user);
    const list = session.list;
    for (let i = 0; i < list.length; i++) {
        if (list[i].link == link) {
            list.splice(i, 1);
        }
    }
    listUser.splice(session.i, 1);
    listUser.push(session);
}

function existItem(item) {
    const session = newSession(user);
    const list = session.list;
    var res = false;
    for (let i = 0; i < list.length; i++) {
        if (item.nombre == list[i].nombre && item.cantidad == list[i].cantidad) {
            const contTotal = parseInt(list[i].cont) + parseInt(item.cont);
            list[i].cont = contTotal;
            list[i].subtotal = list[i].cont * list[i].valorNuevo;
            res = true;
        }
    }
    if (res == false) {
        list.push(item)
    }
    return list;
}

function getList() {
    const session = newSession();
    const list = session.list;
    return list;
}

function total() {
    const session = newSession();
    const list = session.list;
    var aux = 0;
    for (let i = 0; i < list.length; i++) {
        aux += parseInt(list[i].subtotal);
    }
    return aux;
}

module.exports = { getSize, addItem, getList, total, removeItem, user, deleteList };