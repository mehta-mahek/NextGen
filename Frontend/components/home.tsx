// import { Inter, Josefin_Sans } from "next/font/google";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import "./gridpattern.css";
// import AdditionalContent from "./ui/additionalcontent";
// import MyImage from "./MyImage.png";
// const inter = Inter({ subsets: ["latin"] });
// const josefinSans = Josefin_Sans({ subsets: ["latin"] });

// export default function Home() {
//   const router = useRouter();

//   const handleSignInClick = () => {
//     router.push("/signin"); // Navigate to Sign In page
//   };

//   const handleSeeMoreClick = () => {
//     router.push("/see-more"); // Navigate to See More page
//   };
//   return (
//     <main className="min-h-screen bg-[#100425] flex flex-col items-center justify-start p-8">
//       <div className="w-full max-w-7xl h-[90vh] bg-white/10 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden mb-16">
//         <div className="absolute top-6 right-8">
//           <button
//             onClick={handleSignInClick}
//             className={`${inter.className} text-white text-[15px] font-small bg-black/30 px-4 py-2 rounded-full hover:bg-black/50 transition-colors`}
//           >
//             SIGN IN
//           </button>
//         </div>
//         <div className="flex w-full h-full">
//           {/* Left Section */}
//           <div className="w-[45%] mt-24">
//             <h1
//               className={`${josefinSans.className} text-white text-[90px] font-bold leading-none`}
//             >
//               NEXT GEN
//             </h1>
//             <h2
//               className={`${josefinSans.className} text-[30px] font-bold bg-gradient-to-r from-[#2BD8D5] via-[#DC00D3] to-purple-600 text-transparent bg-clip-text whitespace-nowrap`}
//             >
//               Redefining Social Interaction
//             </h2>
//             <p
//               className={`${josefinSans.className} text-white text-[15px] font-extralight mt-6 leading-relaxed`}
//             >
//               Immerse yourself in a dynamic social hub where creativity thrives,
//               connections flourish, and community comes to life. Ride the wave
//               and spark something extraordinary today!
//             </p>
//             <div className="mt-6">
//               <button
//                 onClick={handleSeeMoreClick}
//                 className={`${josefinSans.className} w-[120px] h-[32px] rounded-[15px] bg-gradient-to-r from-[#2BD8D5] via-[#DC00D3] to-purple-600 text-white text-[15px] font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
//               >
//                 See More
//               </button>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="w-[55%] flex items-end justify-end relative">
//             {/* Grid Pattern */}
//             <div className="absolute right-[5px] bottom-0 w-[450px] h-[350px]">
//               <div className="w-full h-full grid-pattern" />
//             </div>

//             {/* Image Container */}
//             <div className="relative w-[400px] h-[400px] mr-9 mb-[-40px] flex items-end">
//               <Image
//                 src={MyImage}
//                 alt="Stylized illustration of a person using a smartphone"
//                 width={400}
//                 height={400}
//                 className="object-contain mix-blend-normal filter brightness-125 contrast-120 saturate-100"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <AdditionalContent />
//     </main>
//   );
// }
