import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: boolean;
  public sent: boolean;
  public filesToUpload: Array<File>;
  public saved_project: Project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crear proyecto';
    this.project = new Project('','','','',new Date().getFullYear(),[],'');
    this.sent = false;
    this.url = Global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.project.langs = this.project.langs[0].replace(' ','').split(',');
    this.sent = true;
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){          
          //subir imagen
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
          .then((result: any) =>{
            if(result){
              this.status = true;
              this.saved_project = response.project;
              form.reset();
            }else{
              this._projectService.deleteProject(response.project._id);
              this.status = false;
            }     
          });
          
        }else{
          this.status = false;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }

    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
