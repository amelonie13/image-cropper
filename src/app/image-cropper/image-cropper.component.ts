import { Component, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  dragPosition = { x: 0, y: 0 };

  constructor() {}

  ngOnInit(): void {}

  getImage(event: any) {
    const canvas = document.getElementById('imgCanvas') as HTMLCanvasElement;
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }
    const file: any = target.files?.[0];
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      this.showImage(image, canvas);
    };
  }

  showImage(img: any, canvas: any) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var context = canvas.getContext('2d');
    if (context) {
      context.drawImage(img, 0, 0);
    } else {
      alert('Error: Context not defined!');
    }
  }
  pixel(x: any, y: any) {
    const canvas = document.getElementById('imgCanvas');
    const h = canvas!.offsetHeight;
    const w = canvas!.offsetWidth;
    const out = (y * w + x) * 4;

    return out;
  }
  cropImage(event?: any) {
    const image = new Image();
    let canvas = document.getElementById('imgCanvas') as HTMLCanvasElement;
    let output = document.getElementById('output') as HTMLCanvasElement;

    image.src = canvas.toDataURL();
    output.width = image.width;
    output.height = image.height;
    let firstCtx = canvas.getContext('2d')!;
    let secondCtx = output.getContext('2d')!;
    let x = event.dropPoint.x;
    let y = event.dropPoint.y;
    let finalWidth = output.width;
    const width = this.calculatAspectRatioW(
      image.width,
      canvas.getBoundingClientRect().width,
      200
    );
    const height = this.calculatAspectRatioH(
      image.height,
      canvas.getBoundingClientRect().height,
      200
    );

    secondCtx.beginPath();
    secondCtx.rect(x, y, width, height);
    secondCtx.clip();
    secondCtx!.drawImage(image, 0, 0);
    let dataURL = output.toDataURL('image/png');
  }
  calculatAspectRatioW(
    originalImgWidth: any,
    currentW: any,
    cropperWidth: any
  ) {
    if (originalImgWidth !== 0) {
      return (originalImgWidth / currentW) * cropperWidth;
    } else {
      return 200;
    }
  }
  calculatAspectRatioH(
    originalImgHeigth: any,
    currentH: any,
    cropperHeigth: any
  ) {
    if (originalImgHeigth !== 0) {
      return (originalImgHeigth / currentH) * cropperHeigth;
    } else {
      return 200;
    }
  }
}
