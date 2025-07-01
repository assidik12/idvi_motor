const messageToOwner = (data: any) => {
  const url = `https://api.whatsapp.com/send?phone=62895338933330&text=${data}&source&data&app_absent`;
  window.open(url, "_blank");
  return true;
};

export default messageToOwner;
