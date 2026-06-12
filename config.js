/**
 * Site configuration — update with your details.
 */
const SITE = {
  name: "Kunal Parekh",
  role: "DevOps Engineer",
  tagline: "Building scalable cloud infrastructure with AWS, Kubernetes, and automation.",
  email: "kunalparekhh@gmail.com",
  linkedin: "https://www.linkedin.com/in/parekhkunal/",
  linkedinDisplay: "linkedin.com/in/parekhkunal",
  location: "India",
  about:
    "DevOps engineer focused on cloud-native architecture, infrastructure as code, and reliable CI/CD pipelines. I design and automate AWS environments that are secure, observable, and built to scale.",
  skills: [
    "AWS",
    "Kubernetes",
    "Terraform",
    "Docker",
    "CI/CD",
    "Linux",
    "Python",
    "GitHub Actions",
    "Monitoring",
    "Networking",
  ],
  experience: [
    {
      title: "DevOps Engineer",
      company: "Your Company",
      period: "2023 — Present",
      points: [
        "Designed and managed AWS infrastructure using Terraform and CloudFormation.",
        "Built CI/CD pipelines with GitHub Actions and AWS CodePipeline.",
        "Implemented container orchestration on EKS with monitoring via CloudWatch.",
      ],
    },
    {
      title: "Cloud / Infrastructure Engineer",
      company: "Previous Company",
      period: "2021 — 2023",
      points: [
        "Migrated workloads to AWS and improved deployment reliability.",
        "Automated provisioning and reduced manual ops with IaC practices.",
      ],
    },
  ],
  certifications: [
    {
      id: "saa",
      name: "AWS Certified Solutions Architect – Associate",
      shortName: "SAA-C03",
      issuer: "Amazon Web Services",
      year: "2025",
      verifyUrl: "https://www.credly.com/",
      badge: "assets/aws-icons/cloudformation.svg",
    },
  ],
  linkedinPosts: [
    {
      date: "2 weeks ago",
      excerpt:
        "Just passed the AWS Solutions Architect Associate (SAA-C03)! Grateful for the learning journey — VPC design, high availability, and cost optimization were the biggest takeaways.",
      likes: 48,
      comments: 12,
      url: "https://linkedin.com/in/your-profile",
    },
    {
      date: "1 month ago",
      excerpt:
        "Deployed a production EKS cluster with Terraform, GitHub Actions, and CloudWatch observability. Sharing my lessons on node groups, IRSA, and pipeline security.",
      likes: 35,
      comments: 8,
      url: "https://linkedin.com/in/your-profile",
    },
    {
      date: "2 months ago",
      excerpt:
        "Infrastructure as Code isn't just about automation — it's about repeatability, reviewability, and reducing drift. Here's how we standardized our AWS landing zone with Terraform modules.",
      likes: 62,
      comments: 15,
      url: "https://linkedin.com/in/your-profile",
    },
  ],
  formEndpoint: "", // Optional: Formspree URL e.g. "https://formspree.io/f/xxxxx"
};
