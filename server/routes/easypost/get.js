const EasyPostClient = require('@easypost/api');

const client = new EasyPostClient('EZAKab5080de21b44c8280b345ec2996206cQgZHinVoayxWpAI9dybv6A');

const shipment = await client.Shipment.create({
  from_address: {
    street1: '417 MONTGOMERY ST',
    street2: 'FLOOR 5',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94104',
    country: 'US',
    company: 'EasyPost',
    phone: '415-123-4567',
  },
  to_address: {
    name: 'Dr. Steve Brule',
    street1: '179 N Harbor Dr',
    city: 'Redondo Beach',
    state: 'CA',
    zip: '90277',
    country: 'US',
    phone: '4155559999',
  },
  parcel: {
    length: 8,
    width: 5,
    height: 5,
    weight: 5,
  },
});

const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());

console.log(boughtShipment);
