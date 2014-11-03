from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class SGRegisterForm(UserCreationForm):
    password1 = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(SGRegisterForm, self).__init__(*args, **kwargs)
        self.fields['email'].label = "Email"
        self.fields['password1'].label = "Password"
        self.fields['password2'].label = "Confirm Password"
        for field_name in self.fields:
            field = self.fields.get(field_name)
            if field:
                field.widget = forms.TextInput(attrs={'placeholder': field.label})

    def save(self, commit=True):
        user = super(SGRegisterForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()

            return user