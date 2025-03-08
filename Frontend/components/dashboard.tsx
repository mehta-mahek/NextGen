// "use client";

// import { useState, useEffect } from "react";
// import { Layout } from "./layout";
// import { MetricCard } from "./metric-card";
// import { CampaignList } from "./campaign-list";
// import { Charts } from "./ui/bar-graph";
// import { DepartmentPieChart } from "./ui/piechart";
// import { PerformanceChart } from "./ui/peichart2";

// const posts = [
//   {
//     id: 0,
//     profileURL: "https://x.com/makemytrip",
//     "company logo":
//       "https://pbs.twimg.com/profile_images/1371391005891563527/rip-cwgt_bigger.jpg",
//     "company name": "MakeMyTrip",
//     mentions: "@NITIAayog",
//     status: "https://x.com/makemytrip/status/1809553001935434119",
//     date: "06-Jul-24",
//     caption:
//       "MakeMyTrip is committed to promoting and supporting micro-entrepreneurs in the hospitality sector! As part of Project Maitri, we'll track the performance of trained hosts and award the top three Homestays, promoting excellence and innovation in this sector!",
//     comments: 960,
//     retweets: 30,
//     likes: 18,
//     views: 26000,
//     post_type: "Reels",
//   },
//   {
//     id: 1,
//     profileURL: "https://x.com/makemytrip",
//     "company logo":
//       "https://pbs.twimg.com/profile_images/1371391005891563527/rip-cwgt_bigger.jpg",
//     "company name": "MakeMyTrip",
//     mentions: "@Junaidbhat79",
//     status: "https://x.com/makemytrip/status/1762771175527354811",
//     date: "28-Feb-24",
//     caption:
//       "We're delighted to hear that! Your satisfaction is our priority, and we're here to assist you whenever you need.",
//     comments: 457,
//     retweets: 38,
//     likes: 15,
//     views: 35000,
//     post_type: "Videos",
//   },
//   {
//     id: 2,
//     profileURL: "https://x.com/makemytrip",
//     "company logo":
//       "https://pbs.twimg.com/profile_images/1371391005891563527/rip-cwgt_bigger.jpg",
//     "company name": "MakeMyTrip",
//     mentions: "@poojaiyer06",
//     status: "https://x.com/makemytrip/status/1762769964203950080",
//     date: "12-Feb-24",
//     caption: "Exceptional teamwork in action!",
//     comments: 901,
//     retweets: 15,
//     likes: 5,
//     views: 28000,
//     post_type: "Carousel Posts",
//   },
// ];

// export default function Dashboard() {
//   // Define state variables
//   const [totalLikes, setTotalLikes] = useState(0);
//   const [totalRetweets, setTotalRetweets] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const [totalViews, setTotalViews] = useState(0);

//   // Function to calculate totals
//   useEffect(() => {
//     setTotalLikes(posts.reduce((total, post) => total + (post.likes || 0), 0));
//     setTotalRetweets(
//       posts.reduce((total, post) => total + (post.retweets || 0), 0)
//     );
//     setTotalComments(
//       posts.reduce((total, post) => total + (post.comments || 0), 0)
//     );
//     setTotalViews(posts.reduce((total, post) => total + (post.views || 0), 0));
//   }, []); // Runs once when the component mounts

//   return (
//     <Layout>
//       <div className="flex items-start justify-evenly w-full">
//         <div className="flex items-start flex-col md:flex-row w-3.5/5">
//           {/* left component */}
//           <div className="flex flex-col items-start flex-grow">
//             <div className="py-6">
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 <MetricCard
//                   title="Total Likes"
//                   value={totalLikes}
//                   change={40}
//                 />
//                 <MetricCard
//                   title="Total Re-tweets"
//                   value={totalRetweets}
//                   change={-10}
//                 />
//                 <MetricCard
//                   title="Total Comments"
//                   value={totalComments}
//                   change={20}
//                 />
//                 <MetricCard
//                   title="Total Views"
//                   value={totalViews}
//                   change={80}
//                 />
//               </div>
//               <div className="mt-8 ml-70">
//                 <CampaignList />
//               </div>
//             </div>
//           </div>

//           {/* right component
//           <div className="flex-shrink-0 w-2/5 pl-6">
//             <div>
//               <DepartmentPieChart />
//               <div className="mt-8">
//                 <PerformanceChart />
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>

//       {/* Centered Charts */}
//       <div className="flex justify-center items-center mt-4 ml-4">
//         <div className="w-full max-w-7xl px-8">
//           <Charts />
//         </div>
//       </div>
//     </Layout>
//   );
// }
