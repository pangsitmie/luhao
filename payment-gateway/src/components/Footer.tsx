import { StyledFooter } from "./styles/Footer.styled";

type Props = {};

const data = [
  { text: "All", link: "/work" },
  { text: "Behind The Scene", link: "/work/behind-the-scene" },
  { text: "Game Pay", link: "/work/gamepay" },
  { text: "Claw Machine Alliance", link: "/work/alliance" },
  {
    text: "Cloud Programming Online",
    link: "/work/cloudProgramming",
  },
  {
    text: "Styled Componenets Demo",
    link: "https://github.com/pangsitmie/Websites/tree/main/styled-components-demo",
  },
  // { text: "Tucope", link: "/work/tucope" },
  // { text: "Moonz", link: "/work/moonz" },
  { text: "XState Demo", link: "/work/xstate" },
];

const Footer = (props: Props) => {
  return (
    <>
      <StyledFooter>
        {data.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="px-2 text-[1.6rem] font-medium text-[#404040] hover:text-primary-100"
          >
            {item.text}
          </a>
        ))}
      </StyledFooter>
      <div className="mb-4 flex items-center justify-center text-[#404040]">
        <p className="mb-2 text-sm"> &copy; Jeriel Isaiah</p>
      </div>
    </>
  );
};
export default Footer;
