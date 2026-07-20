import {Component, OnInit} from '@angular/core';
import {Members} from '../interfaces/Members';
import {FormsModule} from '@angular/forms';
import {LibraryService} from '../services/library-service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-create-members-component',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './create-members-component.html',
})
export class CreateMembersComponent implements OnInit {

  constructor(
    private httpService: LibraryService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  members: Members [] = [];
  member: Members = {} as Members;
  isEdit = false;
  ngOnInit(): void {
    this.httpService.getAllMembers().subscribe(data => this.members = data);
  }

  private emptyMember(): Members {
    return {
      id: 0,
      memberID: '',
      firstName: '',
      surName: '',
      address: '',
      telephoneNumber: '',
      mail: '',
    } as Members;
  }

  openCreateModal(): void {
    this.isEdit = false;
    this.member = this.emptyMember();
  }

  showEditModal(id: number): void {
    this.isEdit = true;
    this.findMembersById(id);
  }

  createMember() {
    if (this.member.id !== 0) {
      this.updateMember();
    }
    if (this.member.id == 0) {
      this.httpService.createMembers(this.member).subscribe({
        next: () => {
          this.httpService.getAllMembers().subscribe(data => this.members = data);
          this.toastr.success('Das Mitglied wurde erfolgreich angelegt.');
          this.route.navigate(['/Members']);

        },
        error: err => {
          this.toastr.error('Beim Anlegen des Mitglieds ist ein Fehler aufgetreten.');
        }
      });
    }
  }

  deleMember(id: number) {
    this.httpService.deleteMember(id).subscribe({
      next: () => {
        this.toastr.success('Das Member wurde erfolgreich gelöscht.');
        this.route.navigate(['/members']);
        this.members = this.members.filter(b => b.id !== id);
      },
      error: err => {
        this.toastr.error('Fehler beim Löschen des Members');
      }
    });
  }

  updateMember() {
    this.httpService.updateMembers(this.member).subscribe({
      next: () => {
        this.toastr.success('Das Mitglied wurde erfolgreich aktualisiert.');
        this.httpService.getAllMembers().subscribe(data => this.members = data);
        this.route.navigate(['/Members']);
      },
      error: err => {
        this.toastr.error('Fehler beim Aktualisieren des Mitglieds');
      }
    });
  }


  findMembersById(id: number): void {
    this.httpService.findMembersById(id).subscribe({
      next: (member) => {
        this.member = member;
        console.log('Mitglied gefunden:', member.id);

      },
      error: (err) => {
        this.toastr.error('Fehler beim Laden des Members:', err);
      }
    });
  }

get isFormValid(): boolean {
  return !!(this.member.memberID && this.member.firstName && this.member.surName && this.member.address && this.member.telephoneNumber && this.member.mail); 
  }
}