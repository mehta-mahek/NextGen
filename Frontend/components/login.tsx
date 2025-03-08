// "use client";

// import { TERipple } from "tw-elements-react";
// import { Github, Mail, Linkedin } from "lucide-react";

// export default function LoginPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#100425] p-4">
//       <div className="w-[400px] h-auto rounded-[20px] bg-gradient-to-br from-[#2BD8D5] via-purple-500 to-[#DC00D3] p-6 flex flex-col justify-center">
//         <form className="space-y-6">
//           {/* Sign-in with Icons */}
//           <div className="flex flex-col items-center">
//             <p className="mb-4 text-lg text-white">Sign in with</p>
//             <div className="flex justify-center space-x-4">
//               {[
//                 { icon: Mail, name: "Gmail" },
//                 { icon: Github, name: "GitHub" },
//                 { icon: Linkedin, name: "LinkedIn" },
//               ].map(({ icon: Icon, name }) => (
//                 <TERipple key={name} rippleColor="light">
//                   <button
//                     type="button"
//                     className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
//                   >
//                     <span className="sr-only">{`Sign in with ${name}`}</span>
//                     <Icon className="w-5 h-5" />
//                   </button>
//                 </TERipple>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white/30 after:mt-0.5 after:flex-1 after:border-t after:border-white/30">
//             <p className="mx-4 mb-0 text-center font-semibold text-white text-base">
//               Or
//             </p>
//           </div>

//           {/* Email Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-white mb-1"
//             >
//               Email address
//             </label>
//             <input
//               id="email"
//               type="email"
//               className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-white mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Remember Me and Forgot Password */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-white"
//               >
//                 Remember me
//               </label>
//             </div>
//             <a
//               href="#"
//               className="text-sm font-medium text-white hover:text-indigo-100"
//             >
//               Forgot your password?
//             </a>
//           </div>

//           {/* Sign-In Button */}
//           <div>
//             <TERipple rippleColor="light" className="w-full">
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </TERipple>
//           </div>

//           {/* Sign-Up Button */}
//           <div>
//             <TERipple rippleColor="light" className="w-full">
//               <button
//                 type="button"
//                 className="w-full flex justify-center py-2 px-4 border border-white/30 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <pre>Create new account. </pre>
//                 <u>Sign up</u>
//               </button>
//             </TERipple>
//           </div>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-white mt-4">
//           Not a member?{" "}
//           <a
//             href="#"
//             className="font-medium text-indigo-300 hover:text-indigo-200"
//           >
//             Start a 14 day free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
