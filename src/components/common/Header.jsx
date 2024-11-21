import mainLogo from "../../assets/images/tempupload-logo.png";

const Header = () => {
  return (
    <div className="navigation-bar">
      <img src={mainLogo} alt="Logo" height={"90px"} width={"90px"} />
      <h1>Temp File Host</h1>
    </div>
  );
};

export default Header;
