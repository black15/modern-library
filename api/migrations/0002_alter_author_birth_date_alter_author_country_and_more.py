# Generated by Django 4.1.3 on 2022-11-05 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='birth_date',
            field=models.DateField(null=True, verbose_name='Birth date'),
        ),
        migrations.AlterField(
            model_name='author',
            name='country',
            field=models.CharField(max_length=50, null=True, verbose_name='Country'),
        ),
        migrations.AlterField(
            model_name='author',
            name='death_date',
            field=models.DateField(null=True, verbose_name='Death date'),
        ),
        migrations.AlterField(
            model_name='author',
            name='descreption',
            field=models.TextField(null=True, verbose_name='Descreption'),
        ),
        migrations.AlterField(
            model_name='book',
            name='descreption',
            field=models.TextField(null=True, verbose_name='Descreption'),
        ),
        migrations.AlterField(
            model_name='book',
            name='language',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Language'),
        ),
    ]
