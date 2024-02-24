import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NskyButtonComponent } from './nsky-button/nsky-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, NskyButtonComponent, FormsModule],
  exports: [NskyButtonComponent]
})
export class NightSkyModule { }
