import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  uploadResults: any;
  selectFile: boolean;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.selectFile = true;
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.apiData.putOrderExcel(formData).subscribe(
        response => {
          this.uploadResults = response;
          this.selectFile = false;
        },
        error => console.log(error)
      );
    }
  }

}
