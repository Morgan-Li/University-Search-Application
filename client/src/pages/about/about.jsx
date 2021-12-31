import "./about.css";

export default function About() {

  return (
    <>
      <div className="aboutContainer">
        <div className="aboutDiv"> 
          <h1 className="aboutTitle">
              About
          </h1>

          <p className="aboutDesc">
            <span className="first-letter">A</span>ccumulating, evaluating, and ranking hundreds of potential tertiary education
            institutions around the world, on an individual level, is simply too much to ask of senior high
            school students or working adults. University ranking websites give you an abstract overview of
            how the world evaluates these institutions, but do not provide the ability to evaluate them on a
            personal level.
          </p>

          <p className="aboutDesc">
            Our solution is to consolidate some of the important requirements into one place. Where
            an individual can search for Universities based on the merits they already have. Our application 
            <b> uniquely</b> allows for institutions that have gotten in contact with us and that have been verified,
            to directly modify their own university information pages. Which helps ensure the information displayed is the
            most up-to-date, relevant, and accurate. Once students have a list of possible institutions, they can further explore those
            Universities’ websites. This can limit their search for Universities from hundreds to dozens or
            less.
          </p>

          <a href="https://github.com/Morgan-Li/University-Search-Application" target="_blank"> 
            <i className="gitIcon fab fa-github"> </i>
          </a>

        </div>
      </div>
    </>
  );
}