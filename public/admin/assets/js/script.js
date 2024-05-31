async function categoryData() {
  let category = document.getElementById("categorySelect").value;
  const container = document.getElementById("container");
  const data = await fetch("/admin/showProduct", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      category: category,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received from backend:", data);
      container.innerHTML = "";
      // Process the received data
      // You can update the UI, manipulate data, etc.

      data.forEach((element) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");

        cardDiv.innerHTML =

          `  <div id="soft${element._id}">
                           
                            
             
                   
                <div  class="card h-100">

                <a href="#" class="img-wrap">
              <img style="height: 200px;width: 305px;" src="/images/${element.imageurl[0]
          }" alt="Product" class="card-img-top">
                       </a>
            <div class="card-body">
                       <h5 class="card-title">${element.title}</h5>
                         <p class="card-text">${element.price}$</p>
   </div>
                 
   <div class="card-footer">
<a href="/admin/edit/${element._id}">

            <button  type="button"
             class="btn btn-sm font-sm rounded btn-brand"><i class="material-icons md-edit"></i>Edit</button></a>

           <button type="button" onclick="softDelete(this, '${element._id}')"
            class="btn btn-sm font-sm btn-light rounded"><i class="material-icons md-delete_forever"></i>Delete</button>
           <br>
           ${element.blockProduct == true
            ? `<button type="button" onclick="softDelete(this, '${element._id}')" class="btn btn-sm font-sm btn-success rounded"><i class="material-icons md-delete_forever"></i>Show</button>`

            : `<button type="button" onclick="softDelete(this, '${element._id}')" class="btn btn-sm font-sm btn-danger rounded"><i class="material-icons md-delete_forever"></i>Hide</button>`
          }
    <p class="quantity" style="color: black;"> quantity = ${element.stock}</p>
           
                    </div>
                          </div>

                          
                          </div>
                                             `;

        container.appendChild(cardDiv);
      });
      return data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  console.log(`this is data ${data}`);
}




function softDelete(tag, id) {
  try {
    let statee = tag.textContent
    let state = statee.toLowerCase()
    console.log(state);
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure that you want to ${state} the product`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes ${state} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/admin/${state}/${id}`) 
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming response contains JSON data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });

        if (state == 'delete') {
          let Hide = document.getElementById(`soft${id}`);
          Hide.style.display = 'none'
        }
        Swal.fire({
          title: `${state}ed`,
          text: `The product has been ${state}ed`,
          icon: "success"
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

const searchInput = document.getElementById('searchInput');

function search () {
  console.log('working');
  console.log(data);
}





async function blockUser(tag, id) {

  let thing = tag.textContent
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: true
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: `Are you sure that you want ${thing} user`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: `The user has been ${thing}ed.`,
        icon: "success"
      });

      if (thing == "Block") {
        tag.textContent = "Unblock"
        tag.style.color = 'white'
        tag.style.backgroundColor = 'green'
      } else {
        tag.textContent = "Block"
        tag.style.color = 'white'
        tag.style.backgroundColor = 'red'
      }1

      fetch(`/admin/${thing}/${id}`)
        .then(response => {
          if (response.ok) {
            return response.json(); // Assuming the response is JSON
            console.log('User Info:', data);
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          // Handle the data returned from the server
          console.log('User Info:', data);
        })
        .catch(error => {
          // Handle network errors or other exceptions
          console.error('Error fetching user info:', error);
        });

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: `User is not ${thing}ed`,
        icon: "error"
      });
    }
  });

}



