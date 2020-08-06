import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'protractor';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public ogProject: Project;
  public status: boolean;
  public sent: boolean;
  public filesToUpload: Array<File>;
  public saved_project: Project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id: string) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {
    this.project.langs = this.project.langs[0].replace(' ', '').split(',');
    this.sent = true;
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.projectUpdated) {
          //subir imagen
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.projectUpdated._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                if (result) {
                  this.status = true;
                  this.project.image = result.projectUpdated.image;
                  this.saved_project = result.projectUpdated;
                } else {
                  this._projectService.updateProject(this.ogProject);
                  this.status = false;                  
                }
              });
          } else {
            this.status = true;
            this.saved_project = response.projectUpdated;
            this.project.image = response.projectUpdated.image;
          }
         


        } else {
          this.status = false;
        }
      },
      error => {
        this.status = false;
        console.log(error);
      }

    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
