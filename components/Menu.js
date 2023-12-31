import { Link, animateScroll as scroll, Events, scrollSpy } from "react-scroll";
import { useState, useEffect } from "react";

export default function Menu({ posts, enSelected }) {
  // Add a new state to track the active section
  const [activeSection, setActiveSection] = useState("");

  // Update the active section when scrolling
  useEffect(() => {
    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    return () => {
      Events.scrollEvent.remove("begin");
    };
  }, []);

  // Group posts by type and keep Korean type as well
  const postTypes = Array.from(
    new Set(
      posts.map((post) =>
        JSON.stringify({
          value: post.menuType.value,
          valueKorean: post.menuType.valueKorean,
        })
      )
    ),
    JSON.parse
  );
  const groupedposts = postTypes.map((type) => ({
    type: type.value,
    typeKorean: type.valueKorean,
    posts: posts.filter((post) => post.menuType.value === type.value),
  }));

  // States for typewriter effect
  const words = ["EON", "BEAN", "MILK"];
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);

  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(
      () => {
        const currentWord = words[wordIndex];

        // If the word is fully displayed and is not being deleted, start deleting
        if (letterIndex === currentWord.length && !isDeleting) {
          // If the current word is "EON", delay for 3 seconds before start deleting
          if (currentWord === "EON") {
            setTimeout(() => setIsDeleting(true), 3000);
          } else {
            setIsDeleting(true);
          }
        }
        // If the word is fully deleted and is being deleted, move to the next word and start typing
        else if (letterIndex === 0 && isDeleting) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
        // If the word is being typed, add a letter
        else if (!isDeleting) {
          setLetterIndex(letterIndex + 1);
        }
        // If the word is being deleted, remove a letter
        else {
          setLetterIndex(letterIndex - 1);
        }
      },
      isDeleting ? 150 : 150
    );

    return () => clearTimeout(timer);
  }, [letterIndex, isDeleting, wordIndex]);

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex]);

  // about clicked
  const [showAbout, setShowAbout] = useState(false);

  // boolean for if the screen is phone sized
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 740);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-[300px] flex-shrink-0 fixed h-screen text-xs ">
      <div
        className="w-full h-full flex flex-col bg-white
       text-black border-r-[0.5px] border-black
       phone:bg-transparent phone:border-none
       "
        id="menu"
      >
        <div
          className="w-full flex justify-between p-[20px] bg-white
          phone:fixed phone:w-screen phone:h-fit phone:top-0 
          phone:left-0 phone:z-50 phone:border-b-[0.5px]
           phone:border-black 
          "
        >
          <Link
            key={"soy"}
            activeClass="text-red-500"
            to={"soy"}
            spy={true}
            smooth={true}
            className={`w-full phone:mb-1
            text-xl
        hover:text-red-500 hover:cursor-pointer
        ${activeSection === "soy" ? "active" : ""}`}
          >
            SOY{currentWord.substring(0, letterIndex)}
          </Link>
          {/* <a
            className="hover:text-red-500 hover:cursor-pointer text-xl"
            onClick={() => setShowAbout(!showAbout)}
          >
            <span>{showAbout ? "LESS" : "ABOUT"}</span>
          </a> */}
        </div>

        <div
          className=" phone:flex  

          phone:fixed phone:w-screen phone:bottom-[-22px] phone:z-50 
           phone:bg-white phone:overflow-x-scroll phone:pb-8 phone:p-2 
           phone:border-t-[0.5px] phone:border-black
           
          "
        >
          {groupedposts.map((group, index) => (
            <div
              className="phone:flex mt-8 phone:mt-0 phone:space-x-2 "
              key={index}
            >
              {!isPhone && (
                <h2 className=" px-4 py-1 font-bold border-b-[0.8px] border-black ">
                  {enSelected
                    ? group.type.toUpperCase()
                    : group.typeKorean.toUpperCase()}
                </h2>
              )}
              {group.posts.map((post, index) => (
                <Link
                  key={index}
                  activeClass="text-red-500 "
                  to={post.title}
                  spy={true}
                  smooth={true}
                  offset={isPhone ? -50 : 0} // Add this line for phone offset
                  className={`w-full flex justify-between items-center px-4 py-1
              border-b-[0.8px] border-[#1c1c1c] 

              phone:border-none phone:w-fit
               hover:text-red-500 hover:cursor-pointer phone:min-w-max 
              ${activeSection === post.id ? "active" : ""}`}
                >
                  <div className="">
                    {enSelected ? post.title : post.titleKorean}
                  </div>
                  {!isPhone && (
                    <div className="text-xs">
                      {enSelected ? post.menuTag : post.menuTagKorean}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
