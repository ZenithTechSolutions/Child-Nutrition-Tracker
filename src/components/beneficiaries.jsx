import '../styles/beneficiaries.css'
import Header from './header'
const Beneficiaries = () => {
  return (
    <>
    <Header />
      <div className="box">
        <div className="bene-container">
          <div className="bene-add-student">
            <h2>Add Student Details</h2>
            <p>+</p>
          </div>
          <div className="bene-count">
            <div className="bene-detail"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;
