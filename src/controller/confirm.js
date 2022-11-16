const fetch = require('node-fetch');
const newMail = require("./mail");
//var idPayco = "ab0a088193a59c1cadb760e2";

async function newMessage(req, ItemsCart, total, type, reference, idPayco) {
    const url = `https://secure.epayco.co/validation/v1/reference/${idPayco}`
    const respuesta = await fetch(url);
    var response = await respuesta.json();
    if (response.data.x_ref_payco === undefined) {
    } else {
        await newMail.mail(req, ItemsCart, total, type, reference, response.data.x_ref_payco);
    }
}

module.exports = { newMessage }