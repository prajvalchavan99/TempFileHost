import mainLogo from "../../assets/images/tempupload-logo.png";

const Header = () => {
  return (
    <div className="navigation-bar">
      <img src={mainLogo} alt="Logo" height={"70px"} width={"70px"} />
      <h2>Temp File Host</h2>
    </div>
  );
};

export default Header;
