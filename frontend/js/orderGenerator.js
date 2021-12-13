
$("#name-user").text(userNameGlobal);
var usuario;

$("#filtro").change(function() {
    if($("#filtro").val()=="Estado"){
        //alert("Ingrese estadp"); 
        document.getElementById("filFecha").style.display="none";
        document.getElementById("estadofil").style.display="";
    }else{
        document.getElementById("filFecha").style.display="";
        document.getElementById("estadofil").style.display="none";
    }
    if($("#filtro").val()==""){
        //alert("Ingrese estadp"); 
        document.getElementById("filFecha").style.display="none";
        document.getElementById("estadofil").style.display="none";
    }
});
$(function(){
    $("#nav-placeholder").load("nav.html");
});
var infoUser = {};
var quantitiesTemp = {};
var products = new Object();
$(function(){
    getProducts();
  
    let urlPage = jQuery(location).attr('href');
    let userCode = getParameters(urlPage);
    idUser = userCode;
    console.log(userCode[0]);
    usuario=userCode[0];
    getInfoUser(userCode[0]);
    inicio(usuario);
    
});

//funcion usando notación flecha. obtiene los parámetros de la url de la página actual
const getParameters = (urlPage) =>{

    //separa el string por el caracter ?
    let array = urlPage.split("?");
    //elimina el primer elemento del arreglo
    array.shift();
    let parametros=[];
    array.forEach(element => {
        console.log(element.replace("%20"," "));
        parametros.push(element.replace("%20"," "));
    });

    return parametros;
}
//función para obtener la informacion del asesor
const getInfoUser = (idUser) => {
    
    $.ajax({
        url: url + '/api/user/'+idUser,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta);
            fillTableInfoUser(respuesta);
            infoUser = respuesta;
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
//función para obtener todos los productos disponibles
const getProducts = () => {
    
    $.ajax({
        url: url + '/api/chocolate/all',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            fillTableProducts(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
//función para llenar la tabla de usuario con la info correspondiente
const fillTableInfoUser = (respuesta) => {
    $("#userName").text(respuesta.name);
    $("#table-body-user").empty();
    console.log(respuesta);
    
        $("#table-body-user").append("<tr class='border-bottom'>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.identification+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.name+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.email+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.zone+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.type+"</td>");
        $("#table-body-user").append("</tr>");
    
}
const fillTableProducts = (respuesta) => {

    $("#table-body-orders").empty();
    for (var i=0; i < respuesta.length; i++) {

        let nombreIdButtons = "buttons"+i;
        let idButtonGroup = "#"+nombreIdButtons;

        let nameIdInput = "quanInput"+i;
        let identInput = "#"+nameIdInput;

        let nombreIdAdd = "buttonAdd"+i;
        let identAdd = "#"+nombreIdAdd;

        let nombreIdDelete = "botonDel"+i;
        let identIdDelete ="#"+nombreIdDelete;
        
        let idProduct = respuesta[i].reference;
        let product = respuesta[i];

        let fila = `<tr class='w-100'>`;
        fila += `   <td class='text-center'> ${respuesta[i].reference}</td>
                    <td class='text-center'> ${respuesta[i].category}</td>
                    <td class='text-center'> ${respuesta[i].description} </td>
                    <td class='text-center'> ${respuesta[i].price} </td>
                    <td class='text-center'>
                        <img src='${respuesta[i].photography}' alt='imagen del producto' class='w-25'>
                    </td>
                    <td class='text-center'>
                        <input type='number' id='${nameIdInput}' class='form-control' maxlength="10"></input>
                    </td>
                    <td id='${nombreIdButtons}' align-item-center'>
                        <button class='btn btn-primary' id='${nombreIdAdd}'>Agregar</button>
                        <button id='${nombreIdDelete}' class='btn btn-danger'>Eliminar</button>
                    </td> `;
        // $("#table-body-orders").append("<tr class='border-bottom'> <td class='text-center'>" + respuesta[i].reference + "</td>");
        // $("#table-body-orders").append("");
        // $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].category + "</td>");
        // $("#table-body-orders").append("<td class='text-center col-md-2'>" + respuesta[i].description + "</td>");
        // $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].availability + "</td>");
        // $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].price + "</td>");
        // $("#table-body-orders").append("<td class='text-center' style='width:20%' >" + respuesta[i].photography + "</td>");
        // $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].quantity + "</td>");
        // $("#table-body-orders").append("<td id='"+nombreIdButtons+"' class='text-center'>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\""+nombreId+"\" onclick=llenarCampos("+objeto+")>Actualizar</a>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center\" onclick=removeProduct("+item+")>Eliminar</a>");
        // $("#tbodyUsers").append("</td>");
        // $(idButtonGroup).append("<button class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Agregar</button>");
        // $(identIdUpdate).click(() => addProduct(objeto));
        
        // $(idButtonGroup).append("<button id='"+nombreIdDelete+"' class='btn btn-primary text-center'>Eliminar</button>");
        // $(identIdDelete).click(() => removeUser(item));
        $("#table-body-orders").append(fila);
        
        // $(identInput).change( () =>{
        //     quantity = $( this ).val();
        //     console.log(quantity);
        //     }
        // );
        let quantity = 0;
        $(identInput).change(function() {
                quantity = $(identInput).val();
              
        });
        console.log("prueba quantity"+ quantity);
        $(identAdd).click(() => {
            
            console.log(`la cantidad ingresada es: ${quantity}`)
            addProduct(product,quantity,identInput);
        });
        $(identIdDelete).click(() => removeUser(product, identInput));
        // $("#table-body-orders").append("</td>");
        // $("#table-body-orders").append(" </tr>");
    }
}

const addProduct = (product, quantity, identInput) => {

   
    alert("Agrego producto para orden, la cantidad es: "+quantity);

    let referenceProduct = "";
    referenceProduct = `${product.reference}`;
    // console.log(referenceProduct);

    if(!(referenceProduct in products)){

        products[referenceProduct] = product;
        
    }
    console.log(quantitiesTemp);
    console.log(referenceProduct +" in " +quantitiesTemp +"  &&  " + quantity + "  !==   "+  quantitiesTemp[referenceProduct]);
    
    if((quantity !== quantitiesTemp[referenceProduct] )){

        quantitiesTemp[referenceProduct] = quantity;
       
        console.log(quantitiesTemp);
    }
   //
    // console.log(products);

}

const removeUser = (product, identInput) => {
    alert("Elimino producto de la orden");
    let referenceProduct = "";
    referenceProduct = `${product.reference}`;

    if( referenceProduct in products )
    {
        delete products[referenceProduct];
        delete quantitiesTemp[referenceProduct];
    }
    $(identInput).val("");
}
const getOrders = () => {
    if(confirm("Desea agregar los productos a una nueva orden")){
        $.ajax({
            url: url+'/api/order/all',
            type: 'GET',
            dataType: 'json',
    
            success: function(respuesta){
                console.log(respuesta.length);
                sendOrder(respuesta);
            },
            error: function (xhr, status) {
                alert('no se encontraron ordenes');
            }
        })
    }
    
}

const sendOrder = (orders) => {

    let idOrder =0;
    console.log(orders);
    let bigger = 0;
    orders.forEach(order => {
        
        if(order.id > bigger){
            bigger = order.id
        }
    });
    idOrder = bigger;
    console.log(`El id mas grande es ${bigger}`);
    //Se genera un id único para la nueva orden a partir de la longitud del objeto que contine las ordenes registradas
    idOrder+=1;
    console.log(idOrder);

    let registerDate = new Date();
    // let dateFormat = registerDate.getFullYear()+'-'+(registerDate.getMonth()+1)+'-'+registerDate.getDate();

    // console.log(dateFormat);

    const order = {
        id: idOrder,
        registerDay: registerDate,
        status: null,
        salesMan: infoUser,
        products: products,
        quantities: quantitiesTemp
    }
    console.log(order);
    
    $.ajax (
        {
            url          : url+'/api/order/new',
            type         : 'POST',
            contentType  : "application/json;charset-UTF-8",
            dataType     : 'JSON',
            data         :  JSON.stringify(order),

            success      :  function(response){
                                console.log(response);
                                alert("Orden registrada");
                                quantitiesTemp = {};
                                products = {};
                                getProducts();
                            },
            error       :   function(xhr,status){
                            console.log(status);
                            alert("Fallo al registrar la orden");
                            }
                        
        }
    );

}

function getFilter(){

    if($("#status").val() !== ""){
        $("#fechaOrder").val("");
        complementUrl = 'state/'+$("#status").val()+'/'+ usuario
    }
    if($("#fechaOrder").val() !== ""){
        var f = new Date(document.getElementById("fechaOrder").value);
        var fechaEntrega = f.getFullYear()+ '-' + ( f.getMonth() + 1 ) + '-' + (f.getDate()+1);
        complementUrl = 'date/'+fechaEntrega+'/'+ usuario
      
    }

    $.ajax({
        url: url+'/api/order/'+complementUrl,
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
        
         console.log(respuesta);
         $('#table-body-orders2').empty();
            for (var i=0; i < respuesta.length; i++) {
    
    
                f = new Date(respuesta[i].registerDay);
                fechaPasar = f.getDate() + '/' + ( f.getMonth() + 1 ) + '/' + f.getFullYear();
                
                $("#table-body-orders2").append("<tr class='border-bottom'>");
                $("#table-body-orders2").append("<td class='text-center'>" + fechaPasar + "</td>");
                $("#table-body-orders2").append("<td class='text-center'>" + respuesta[i].id + "</td>");
                $("#table-body-orders2").append("<td class='text-center'>" + respuesta[i].status + "</td>")                
                let nombreId = "botonDet"+i
                let identificador = "#"+nombreId
                let idOrder = respuesta[i].id;

                $("#table-body-orders2").append("<td class='text-center'> <button id='"+nombreId+"' class='btn btn-primary text-center me-2' >Ver Detalle</button></td>");
                $(identificador).click(() => showDetailOrder(idOrder));

            }

        },
        error: function (xhr, status) {
            alert('Error, tarea no ejecutada');
        }
        
    });

}

function showDetailOrder(idOrder){
    document.getElementById("order").style.display="";
    document.getElementById("order2").style.display="";
    $.ajax({
        url: url+'/api/order/'+idOrder,
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
            console.log(respuesta);

            f = new Date(respuesta.registerDay);
            fechaPasar = f.getDate() + '/' + ( f.getMonth() + 1 ) + '/' + f.getFullYear();
            console.log(respuesta);
            let products = respuesta.products;
             //console.log(products)
    
            $("#table-body-detail3").empty();

            //itera la lista de productos y llena la tabla con la info correspondiente
            for (i in products){
    
              $("#table-body-detail3").append("<tr class='border-bottom'>");
              $("#table-body-detail3").append("<td class='text-center col-md-1'>" + products[i].photography + "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + products[i].reference + "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + products[i].category + "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + products[i].description + "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + products[i].price+ "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + respuesta.quantities[i]+ "</td>");
              $("#table-body-detail3").append("<td class='text-center'>" + products[i].quantity + "</td></tr>");

            }

        },
        error: function (xhr, status) {
            alert('Error, no se encontro ID');
        }
        
    });
    //tabla en la cual se pueden ver los productos de la orden actualizada    

}

function inicio(id){
    $.ajax({
        url: url+'/api/order/salesman/'+id,
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
        
         console.log(respuesta);
         $('#table-body-orders2').empty();
            for (var i=0; i < respuesta.length; i++) {
    
    
                f = new Date(respuesta[i].registerDay);
                fechaPasar = f.getDate() + '/' + ( f.getMonth() + 1 ) + '/' + f.getFullYear();
                
                $("#table-body-orders2").append("<tr class='border-bottom'>");
                $("#table-body-orders2").append("<td class='text-center'>" + fechaPasar + "</td>");
                $("#table-body-orders2").append("<td class='text-center'>" + respuesta[i].id + "</td>");
                $("#table-body-orders2").append("<td class='text-center'>" + respuesta[i].status + "</td>")                
                let nombreId = "botonDet"+i
                let identificador = "#"+nombreId
                let idOrder = respuesta[i].id;

                $("#table-body-orders2").append("<td class='text-center'> <button id='"+nombreId+"' class='btn btn-primary text-center me-2' >Ver Detalle</button></td>");
                $(identificador).click(() => showDetailOrder(idOrder));

            }

        },
        error: function (xhr, status) {
            alert('Error, tarea no ejecutada');
        }
        
    });
}
