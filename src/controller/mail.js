const nodemailer = require('nodemailer');

async function mail(req, ItemsCart, total, type, reference, idPayco) {
    var payment = "";
    var information = "";
    var hoy = new Date();
    var items = "";
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'coraliestore30@gmail.com',
            pass: 'Proyecto123', // generated ethereal password
        },
    });
    for (let i = 0; i < ItemsCart.length; i++) {
        items = items + "<tr>" +
            "<td>" + "<img src=" + ItemsCart[i].imagen + " alt='' title='SocialMedia' width='50' height='50'></td>" +
            "<td><h3>" + ItemsCart[i].cantidad + " " + ItemsCart[i].nombre + "</h3></td>" +
            "<td><h3><center>" + ItemsCart[i].cont + "</center></h3></td>" +
            "<td><h3><center>$" + ItemsCart[i].subtotal + "</center></h3></td>" +
            "</tr>";
    }
    const table = "<table class='default'>" +
        "<thead>" +
        "<tr>" +
        "<td></td>" +
        "<td><h2>Producto</h2></td>" +
        "<td><h2>Cantidad</h2></td>" +
        "<td><h2>Subtotal</h2></td>" +
        "</tr>" +
        items +
        "<thead>" +
        "</table >";
    if (type == "payment") {
        payment = "<h2>PAGO: Realizado por ePayco</h2>"
    } else if (type == "pending") {
        payment = "<h2>PAGO: Pendiente en ePayco</h2>"
    } else {
        payment = "<h2>PAGO: Sin Realizar </h2>"
        information = "<p><strong>Nombre del cliente: </strong>" + req.body.name + "</p>" +
            "<p><strong>link del perfil: </strong>" + req.body.link + "</p>" +
            "<p><strong>Correo: </strong>" + req.body.mail + "</p>" +
            "<p><strong>Whatsapp: </strong>+" + req.body.country + " - " + req.body.whatsapp + "</p>" +
            "<p><strong>Notas: </strong>" + req.body.notes + "</p><br>";
    }
    let info = await transporter.sendMail({
        from: '"ColarieStore.com 👻" <coraliestore30@gmail.com>', // sender address
        //to: "jhonaelingeniero04@gmail.com", // list of receivers
        to: "soportealcliente@ColarieStore.com",
        subject: "Nuevo Pedido ✔",// plain text body
        html:
            "<h1>NUEVO PEDIDO ✔</h1>" +
            "<p><strong>Referencia: </strong>" + reference + "</p>" +
            "<p><strong>Id ePayco: </strong>" + "<a href='https://dashboard.epayco.com/transacciones/detalle/" + idPayco + "' target='_blank'>" + idPayco + "</a></p>" +
            "<p><strong>Fecha: </strong>" + fechaYHora + "</p>" +
            information +
            table + "<p><strong>Fecha: </strong>" + fechaYHora + "</p>" +
            "<h2>Total: $" + total + "</h2>" +
            payment
    });
}

module.exports = { mail };