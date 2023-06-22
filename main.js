fetch('shipment1.json')
  .then(response => response.json())
  .then(data => {
    const sessionsList = document.querySelector('.sessions');

    data.forEach(event => {
      const eventDateTime = new Date(event.eventDateTime);
      const eventTime = eventDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const eventDescription = `${event.eventPosition.status}`;
      const eventCity = `${event.eventPosition.city}, ${event.eventPosition.country}`;
      
      const listItem = document.createElement('li');

      listItem.innerHTML = `
        <div class="time">${eventTime}</div>
        <p>${eventDescription}</p><span style="margin-left:40px;">${eventCity}</span>
      `;

      if (eventDescription === 'ARRIVED AT YOUR PLACE') {
        listItem.classList.add('arrived');
      } else if (eventDescription === 'DELIVERED') {
        listItem.classList.add('delivered');
      }
      if (event.shipment.status.shipmentIsDelayed === 1) {
        listItem.classList.add('delayed');
      }

      sessionsList.appendChild(listItem);
    });
  });
