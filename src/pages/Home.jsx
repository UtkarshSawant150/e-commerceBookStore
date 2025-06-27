import { NavLink } from "react-router-dom";
import imgsrc1 from "../images/home1.jpg";
import imgsrc4 from "../images/home2.jpg";
import imgsrc2 from "../images/silent-patient.jpg";
import imgsrc3 from "../images/life-is-what-you-make-it.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state.logging);

  return (
    <>
      <main>
        <div className="container-fluid">
          {!state.isLoggedIn ? (
            <div className="row home1 mt-1">
              <div className="col-12 col-lg-5 home_content1 order-2 order-lg-1 p-lg-5 p-3">
                <h2>Embrace the Magic of Reading.</h2>
                <p>
                  A bookstore is a celebration of the written word and a haven
                  for those who relish in its beauty.
                </p>
                <button type="button" className="btn btn-dark">
                  <NavLink className="button" to="/login">
                    Login
                  </NavLink>
                </button>
              </div>
              <div className="col-12 col-lg-7 home_content2 order-1 order-lg-2 p-0">
                <img className="img-fluid" src={imgsrc1} alt="homeImage" />
              </div>
            </div>
          ) : null}
          <div className="row home2">
            <div className="col-lg-6 col-12 home_content1 p-lg-5 p-3">
              <img src={imgsrc2} alt="book-image" className="img-fluid" />
              <img className="img-fluid" src={imgsrc3} alt="" />
            </div>
            <div className="col-lg-6 col-12 home_content2 p-lg-5 p-3">
              <h2>Welcome to Bookish Bliss - Your Literary Haven!</h2>
              <p className="my-lg-3">
                Are you ready to embark on a journey through the magical realms
                of literature? Look no further, for Bookish Bliss is your
                ultimate destination for all things books. As avid readers and
                book enthusiasts ourselves, we have carefully curated a diverse
                and enchanting collection that caters to every reader's taste
                and preference.
              </p>
            </div>
          </div>
          <div className="row home1 home3 mt-1">
            <div className="col-12 col-lg-5 home_content1 order-2 order-lg-1 p-lg-5 p-3">
              <h2>What book are you looking for?</h2>
              <p>
                Not sure what to read next? Explore our catalog of public domain
                books. At Bookish Bliss, we believe that every book is a gateway
                to a new adventure, a fresh perspective, and an unforgettable
                experience.Welcome home to the world of books!
              </p>
              <button className="btn btn-dark" type="button">
                <NavLink className="button" to="/books">
                  Explore Now
                </NavLink>
              </button>
            </div>
            <div className="col-12 col-lg-7 home_content2 order-1 order-lg-2 p-0">
              <img className="img-fluid" src={imgsrc4} alt="homeImage" />
            </div>
          </div>
          <div className="row home4">
            <div className="col-12 p-lg-5 p-1">
              <div className="about">
                <h2>Discover the World of Words</h2>
                <p>
                  Step into our store and be transported to a world where
                  imagination knows no bounds. Our shelves are adorned with a
                  treasure trove of genres, from captivating fiction that whisks
                  you away to far-off lands, to thought-provoking non-fiction
                  that expands your horizons. Dive into mysteries, romance,
                  science fiction, historical epics, and so much more. No matter
                  your interest, we have the perfect book waiting for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
