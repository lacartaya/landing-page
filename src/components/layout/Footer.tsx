import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t border-border bg-secondary/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="font-bold tracking-tight text-lg">Orveka</Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Accelerate business growth with strategic advertising
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <span>Hello@orveka.studio</span>
              <span>New York, NY</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Orveka Studio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;