# Generated by Django 3.1.6 on 2021-02-17 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MonthlySearch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=40)),
                ('pc', models.IntegerField()),
                ('mobile', models.IntegerField()),
                ('pc_mobile', models.IntegerField()),
                ('comp1', models.IntegerField()),
                ('blog', models.IntegerField()),
                ('cafe', models.IntegerField()),
                ('blog_cafe', models.IntegerField()),
                ('comp2', models.IntegerField()),
            ],
        ),
    ]
