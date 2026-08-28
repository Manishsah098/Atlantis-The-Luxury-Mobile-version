import os
import zipfile

def package_project():
    output_filename = "Atlantis_The_Royal_App.zip"
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(workspace_dir, output_filename)

    ignore_names = {output_filename, '.git', '.DS_Store', 'package_app.py', '.gradle', 'build', '.idea'}

    print(f"Creating package: {output_path}")

    # Build file list first to avoid locking while writing
    files_to_add = []
    for root, dirs, files in os.walk(workspace_dir):
        dirs[:] = [d for d in dirs if d not in ignore_names]
        for file in files:
            if file in ignore_names or file.endswith('.zip'):
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, workspace_dir)
            files_to_add.append((file_path, arcname))

    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path, arcname in files_to_add:
            zipf.write(file_path, arcname)
            print(f"  Added: {arcname}")

    print(f"\nSuccess! Project successfully packaged into: {output_filename}")

if __name__ == '__main__':
    package_project()
