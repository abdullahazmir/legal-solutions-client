// import { Button, Input, Select, SelectIndicator } from "@heroui/react";
// import {Magnifier} from '@gravity-ui/icons';

// export default function HeroSearchSection() {
//   const practiceAreas = ["Corporate", "Criminal", "Family", "Civil", "Property"];
//   const districts = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

//   return (
//     <section className="relative w-full bg-black py-24 px-6 lg:px-12 flex flex-col items-center text-center">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10" />

//       <div className="max-w-4xl flex flex-col items-center gap-8">
//         <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
//           Find Your <span className="text-blue-500">Legal Expert</span> in Seconds
//         </h1>

//         {/* Search Component */}
//         <div className="w-full bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-gray-800 shadow-2xl flex flex-col md:flex-row gap-2">
//           <Input 
//             placeholder="Search by lawyer name..." 
//             className="flex-1"
//             startcontent={<Magnifier className="text-gray-400" />}
//           />
//           <Select placeholder="Law Type" className="w-full md:w-40">
//             {practiceAreas.map((area) => <SelectIndicator key={area}>{area}</SelectIndicator>)}
//           </Select>
//           <Select placeholder="Location" className="w-full md:w-40">
//             {districts.map((dist) => <SelectIndicator key={dist}>{dist}</SelectIndicator>)}
//           </Select>
//           <Button className="bg-blue-600 text-white font-bold h-12 md:px-8">
//             Search
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }