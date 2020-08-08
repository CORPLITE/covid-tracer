const QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
};

const QRErrorCorrectSelect = [
  {
    key: 'L',
    value: QRErrorCorrectLevel.L,
  },
  {
    key: 'M',
    value: QRErrorCorrectLevel.M,
  },
  {
    key: 'Q',
    value: QRErrorCorrectLevel.Q,
  },
  {
    key: 'H',
    value: QRErrorCorrectLevel.H,
  },
];

export { QRErrorCorrectLevel, QRErrorCorrectSelect };
