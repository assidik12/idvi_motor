const messageToOwner = (message: string) => {
  const url = `https://api.whatsapp.com/send?phone=62895338933330&text=${message}`;
  window.open(url, "_blank");
  return true;
};

export default messageToOwner;
