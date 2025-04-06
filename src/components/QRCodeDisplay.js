import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  

const QRCodeDisplay = ({ location }) => {
  const { firstName, lastName, address, city, password, confirmationCode } = location.state;

  const qrCodeData = `Name: ${firstName} ${lastName}\nAddress: ${address}, ${city}\nPassword: ${password}\nConfirmation Code: ${confirmationCode}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Your Confirmation QR Code:</h3>
      <QRCodeCanvas value={qrCodeData} size={256} />
    </div>
  );
};

export default QRCodeDisplay;
