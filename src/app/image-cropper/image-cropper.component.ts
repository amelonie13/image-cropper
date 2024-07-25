import { Component, OnInit } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  dragPosition = {x: 0, y: 0};


  constructor() { }

  ngOnInit(): void {
  }

  getImage(event: any) {
    const canvas = document.getElementById("imgCanvas") as HTMLCanvasElement;
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }
    const file: any = target.files?.[0];
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      this.showImage(image, canvas);
    }
  }

  showImage(img: any, canvas: any){
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var context = canvas.getContext("2d");
    if(context)
    {
      context.drawImage(img, 0, 0);
    }
    else
    {
      alert("Error: Context not defined!");
    }
  }
 pixel (x: any,y:any)
{
	const canvas = document.getElementById('imgCanvas');
    const h = canvas!.offsetHeight;
    const w = canvas!.offsetWidth;
    const out = (y*w+x)*4;

    return(out);
}
cropImage(event?: any){
  const image = new Image();
  let canvas = document.getElementById('imgCanvas') as HTMLCanvasElement;
  let output = document.getElementById('output') as HTMLCanvasElement;
  image.src = canvas.toDataURL();
  output.width = image.width;
  output.height = image.height;
  let firstCtx = canvas.getContext('2d')!
  let secondCtx = output.getContext('2d')!
  let x = event.dropPoint.x
  let y = event.dropPoint.y

  // Create a circular clipping path
  secondCtx.beginPath();
  secondCtx.rect(x -100 , y -100, 200, 200);
  secondCtx.clip();
  secondCtx!.drawImage(image, 0,0 )
}

}
