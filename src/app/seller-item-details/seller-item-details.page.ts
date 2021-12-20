import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LocalFile } from '../models/local-file';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { convertBlobToBase64 } from '../helpers/convert-blob-base64';
import { finalize } from 'rxjs/operators';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-seller-item-details',
  templateUrl: './seller-item-details.page.html',
  styleUrls: ['./seller-item-details.page.scss'],
})
export class SellerItemDetailsPage implements OnInit {
  images: LocalFile[] = [];
  isDisabled = true;
  constructor(
    private navController: NavController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadFiles();
  }

  savePickupDeliveryProfile() {
    console.log('save as a profile clicked');
  }

  saveProduct() {
    console.log('save product');
  }

  cancelAndGoBack() {
    this.navController.back();
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    })
      .then(
        (result) => {
          this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
  }

  // Convert the base64 to blob data
  // and create  formData with it
  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await convertBlobToBase64(blob)) as string;
    }
  }

  // Upload the formData to our API
  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    // Use your own API!
    const url = 'http://localhost:8888/images/upload.php';
  }
}
