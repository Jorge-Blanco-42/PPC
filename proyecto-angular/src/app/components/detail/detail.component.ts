import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.project = new Project('','','','',2020,[],'');
    this.confirm = false;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProject(id);
    });
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }

  getProject(id: string){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project;
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteProject(id: string){
    this._projectService.deleteProject(id).subscribe(
      response =>{
        if(response.project){
          this._router.navigate(['/proyectos']);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
}
