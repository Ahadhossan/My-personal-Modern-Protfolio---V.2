import AwardsSection from "./AwardsSection";

export default function AwardsPage() {
  return (
    <AwardsSection
      heading="Awards & Recognition"
      description="Celebrating milestones, meaningful contributions, and professional growth."
      theme="dark"
      accentColor="#B7F36B"
      awards={[
        {
          id: "award-1",
          year: "2025",
          title: "Outstanding Contributor",
          organization: "Organization Name",
          image: {
            src: "/awards/award-1.jpg",
            alt: "Outstanding Contributor certificate",
          },
        },
        {
          id: "award-2",
          year: "2024",
          title: "Frontend Development Challenge",
          organization: "Organization Name",
        },
        {
          id: "award-3",
          year: "2023",
          title: "Project Excellence",
          organization: "Organization Name",
        },
      ]}
    />
  );
}
