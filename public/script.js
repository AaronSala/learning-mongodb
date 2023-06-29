// Get the form element
const carForm = document.getElementById('carForm');

// Add event listener for form submission
carForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting and page refresh

  // Get the form data
  const formData = new FormData(carForm);

  // Create an object to hold the car data
  const carData = {
    maker: formData.get('maker'),
    model: formData.get('model'),
    year: formData.get('year'),
    price: formData.get('price'),
    image: formData.get('image')
  };

  // Send a POST request to the server to save the car data
  axios.post('/cars', carData)
    .then(function(response) {
      console.log('Car added:', response.data);
      carForm.reset(); // Reset the form
      fetchAndDisplayCars(); // Fetch and display the updated car data
    })
    .catch(function(error) {
      console.error('Error adding car:', error);
    });
});

// Function to fetch and display the car data
function fetchAndDisplayCars() {
  // Send a GET request to the server to retrieve the car data
  axios.get('/cars')
    .then(function(response) {
      const carList = response.data;

      // Clear previous car list
      const carListElement = document.getElementById('carList');
      carListElement.innerHTML = '';

      // Iterate over the car list and create HTML elements to display each car
      carList.forEach(function(car) {
        const carElement = document.createElement('div');
        carElement.classList.add('car');

        const carImageElement = document.createElement('img');
        carImageElement.src = `/uploads/${car.image}`; 
        carElement.appendChild(carImageElement);

        const carInfoElement = document.createElement('div');
        carInfoElement.innerHTML = `
        
          <h2>${car.maker} ${car.model}</h2>
          <p>Year: ${car.year}</p>
          <p>Price: ${car.price}</p>
        `;
        carElement.appendChild(carInfoElement);

        carListElement.appendChild(carElement);
      });
    })
    .catch(function(error) {
      console.error('Error fetching cars:', error);
    });
}

// Call the fetchAndDisplayCars function to load and display the initial car data
fetchAndDisplayCars();
