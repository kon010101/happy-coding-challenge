import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from '../../app.module';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    const { debugElement } = fixture;

    const title = debugElement.query(By.css('h1'));
    const inputs = debugElement.queryAll(By.css('input'));
    const labels = debugElement.queryAll(By.css('label'));

    expect(labels[0].nativeElement.textContent).toBe('Email');
    expect(labels[1].nativeElement.textContent).toBe('Password');

    expect(inputs).toHaveLength(2);

    expect(title.nativeElement.textContent).toBe('Login');
  });

  it('should have the correct values in input fields', () => {
    const { debugElement } = fixture;

    const email = 'test@test.de';
    const password = 'password';

    const inputs = debugElement.queryAll(By.css('input'));
    const button = debugElement.query(By.css('button'));

    inputs[0].nativeElement.value = email;
    inputs[1].nativeElement.value = password;
    inputs[0].nativeElement.dispatchEvent(new Event('input'));
    inputs[1].nativeElement.dispatchEvent(new Event('input'));
    // // Dispatch input ev
    button.triggerEventHandler('click', null);

    expect(component.dialogForm.value.email).toBe(email);
    expect(component.dialogForm.value.password).toBe(password);
  });
});
