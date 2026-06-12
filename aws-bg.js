const AWS_SERVICES = [
  { id: "ec2", name: "EC2", layer: "main", top: 7, left: 8, size: 72, anim: "a", delay: 0 },
  { id: "s3", name: "S3", layer: "main", top: 12, left: 88, size: 68, anim: "b", delay: 1.2 },
  { id: "lambda", name: "Lambda", layer: "main", top: 35, left: 3, size: 64, anim: "c", delay: 0.6 },
  { id: "eks", name: "EKS", layer: "main", top: 40, left: 92, size: 70, anim: "a", delay: 2.1 },
  { id: "vpc", name: "VPC", layer: "main", top: 62, left: 6, size: 66, anim: "b", delay: 1.8 },
  { id: "cloudwatch", name: "CloudWatch", layer: "main", top: 70, left: 85, size: 74, anim: "c", delay: 0.3 },
  { id: "iam", name: "IAM", layer: "main", top: 22, left: 18, size: 60, anim: "c", delay: 2.5 },
  { id: "codepipeline", name: "CodePipeline", layer: "main", top: 52, left: 20, size: 62, anim: "a", delay: 1.5 },
  { id: "route53", name: "Route 53", layer: "main", top: 78, left: 22, size: 68, anim: "b", delay: 0.9 },
  { id: "ecs", name: "ECS", layer: "main", top: 8, left: 42, size: 64, anim: "c", delay: 1.1 },
  { id: "cloudformation", name: "CloudFormation", layer: "main", top: 58, left: 78, size: 66, anim: "a", delay: 2.8 },
  { id: "ecr", name: "ECR", layer: "main", top: 28, left: 78, size: 58, anim: "b", delay: 0.4 },
  { id: "rds", name: "RDS", layer: "deep", top: 18, left: 72, size: 48, anim: "b", delay: 3.2 },
  { id: "dynamodb", name: "DynamoDB", layer: "deep", top: 45, left: 12, size: 46, anim: "a", delay: 2.2 },
  { id: "elb", name: "ELB", layer: "deep", top: 55, left: 48, size: 44, anim: "c", delay: 1.7 },
  { id: "secrets-manager", name: "Secrets Manager", layer: "deep", top: 72, left: 58, size: 50, anim: "b", delay: 0.8 },
  { id: "sns", name: "SNS", layer: "deep", top: 32, left: 58, size: 42, anim: "a", delay: 2.6 },
  { id: "sqs", name: "SQS", layer: "deep", top: 85, left: 72, size: 46, anim: "c", delay: 1.4 },
  { id: "lambda", name: "Lambda", layer: "deep", top: 5, left: 68, size: 40, anim: "b", delay: 3.5 },
  { id: "s3", name: "S3", layer: "deep", top: 88, left: 10, size: 44, anim: "a", delay: 2.9 },
  { id: "ec2", name: "EC2", layer: "deep", top: 48, left: 88, size: 42, anim: "c", delay: 3.8 },
  { id: "iam", name: "IAM", layer: "deep", top: 15, left: 32, size: 40, anim: "a", delay: 1.9 },
  { id: "eks", name: "EKS", layer: "accent", top: 2, left: 24, size: 96, anim: "a", delay: 0.5 },
  { id: "cloudformation", name: "CloudFormation", layer: "accent", top: 82, left: 38, size: 88, anim: "b", delay: 2.0 },
  { id: "route53", name: "Route 53", layer: "accent", top: 10, left: 92, size: 82, anim: "c", delay: 3.0 },
  { id: "vpc", name: "VPC", layer: "accent", top: 88, left: 4, size: 90, anim: "a", delay: 1.6 },
];

function initAwsBackground(options = {}) {
  const deep = document.getElementById("aws-orbit-deep");
  const main = document.getElementById("aws-orbit-main");
  const accent = document.getElementById("aws-orbit-accent");

  if (!deep || !main || !accent) return;

  const layers = { deep, main, accent };

  AWS_SERVICES.forEach((service, index) => {
    const container = document.createElement("div");
    container.className = `aws-icon aws-icon--${service.anim}`;
    container.style.top = `${service.top}%`;
    container.style.left = `${service.left}%`;
    container.style.setProperty("--icon-size", `${service.size}px`);
    container.style.setProperty("--anim-delay", `${service.delay}s`);
    container.style.setProperty("--depth", `${(index % 4) + 1}`);

    const float = document.createElement("div");
    float.className = "aws-icon__float";

    const img = document.createElement("img");
    img.src = `assets/aws-icons/${service.id}.svg`;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.draggable = false;

    float.appendChild(img);
    container.appendChild(float);
    layers[service.layer].appendChild(container);
  });

  const icons = document.querySelectorAll(".aws-icon");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverTarget = options.hoverTarget || document.querySelector(".hero, .page-shell");

  if (!prefersReducedMotion && window.innerWidth > 640) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      icons.forEach((icon) => {
        const depth = Number(getComputedStyle(icon).getPropertyValue("--depth")) || 2;
        icon.style.setProperty("--px", `${x * depth * 5}px`);
        icon.style.setProperty("--py", `${y * depth * 5}px`);
      });
    });
  }

  const awsBg = document.querySelector(".aws-bg");
  if (hoverTarget && awsBg && !prefersReducedMotion) {
    hoverTarget.addEventListener("mouseenter", () => awsBg.classList.add("aws-bg--active"));
    hoverTarget.addEventListener("mouseleave", () => awsBg.classList.remove("aws-bg--active"));
  }
}
