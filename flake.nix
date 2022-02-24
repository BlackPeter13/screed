{
  description = "Flake ";

  inputs = {
    nixpkgs = { url = "github:nixos/nixpkgs/nixos-unstable"; };
     mkNodePackage = { url = "github:winston0410/mkNodePackage/develop"; };
    #mkNodePackage = { url = "path:/home/hugosum/mkNodePackage"; };
  };

  outputs = { nixpkgs, mkNodePackage, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
      defaultPackage = (mkNodePackage.lib.${system}.mkNpmPackage{
        pname = "polarpool";
        version = "0.2.1";
        src = ./.;

        buildInputs = with pkgs; [ ];

        buildPhase = ''
          npm run build
        '';

        installPhase = ''
          mkdir -p "$out"
          cp -r public "$out"
        '';
      });
    in {
      defaultPackage.${system} = defaultPackage;
      packages.${system} = {
        default = defaultPackage;
      };
      devShell.${system} = (({ pkgs, ... }:
        pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs-16_x
          ];

        }) { inherit pkgs; });
    };
}
