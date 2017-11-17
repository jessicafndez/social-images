<?php
  use Box\Spout\Writer\WriterFactory;
  use Box\Spout\Reader\ReaderFactory;
  use Box\Spout\Common\Type;

  class ReportsCreatorView extends Account {

    function show() {
      $this->setFile('f_report_data','reportes_datos/reportes_datos_dashboard');
      $this->setBlock('f_report_data', 'subcontent_saved_reports');
      $this->showSavedReports('subcontent_saved_reports');
      $this->parseContent('f_report_data');
    }

    function showSavedReports($block="content") {
      $this->setFile('f_report_directory', 'reportes_datos/reports_directory');
      $this->setBlock('f_report_directory', 'row_reporte');
      $path = BASEPATH. "upload_reports/";
      $files = array_diff(scandir($path), array('.', '..', '.htaccess'));
      foreach ($files as $f) {
        $this->setVar("file_name" , $f);
        $this->setVar("file_name_src",
        '\ReportsCreatorView\downLoadReport?r_name=' . $f);
        $this->parseRec('row_reporte');
      }
      $this->parse($block, 'f_report_directory');
    }

    function downLoadReport() {
      if(isset($_GET['r_name'])) {
        $filePath = BASEPATH ."upload_reports/". $_GET['r_name'];
        if(file_exists($filePath)) {
            header('Content-Disposition: attachment; filename="' . basename($filePath). '"');
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Length: ' . filesize($filePath));
            header('Content-Transfer-Encoding: binary');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            ob_clean();
            flush();
            readfile($filePath);
            exit();
        }
        exit();
        //$reader->close();
      }
    }

    function createAllProyectsReportView() {
      $filename = "Report_todo_proyectos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllProyectoReport();
      if(empty($pReport)) {

      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createAllProyectsReportDownload() {
      $filename = "Report_todo_proyectos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllProyectoReport();
      if(empty($pReport)) {

      }
      else {
        $download->createSavedCSV($pReport, false, $filename);

      }
    }
    function createAllProyectsReportZip() {
      $filename = "Report_todo_proyectos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllProyectoReport();
      if(empty($pReport)) {

      }
      else {
          $download->csvFile($pReport, $filename);
      }
    }

    function createActiveProjects() {
      $filename = "Report_proyectos_activos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllActiveReport();
      if(empty($pReport)) {
      //  print_r("Ello");
      }
      else {
       $download->report($pReport, false, $filename);
      }
    }
    function createActiveDownload() {
      $filename = "Report_proyectos_activos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllActiveReport();
      if(empty($pReport)) {

      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
        $this->showSavedReports('subcontent_saved_reports');
      }
    }
    function createActiveReportZip() {
      $filename = "Report_proyectos_activos_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllActiveReport();
      if(empty($pReport)) {

      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createDescartadosProjects() {
      $filename = "Report_proyectos_descartados_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllDescartadosReport();
      if(empty($pReport)) {

      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createDescartadosDownload() {
      $filename = "Report_proyectos_descartados_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllDescartadosReport();
      if(empty($pReport)) {

      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createDescartadosReportZip() {
      $filename = "Report_proyectos_descartados_".date('Y-m-d_H-i-s');
      $download = new Download();
      $project = new Project(false, $this->DB);
      $pReport = $project->getAllDescartadosReport();
      if(empty($pReport)) {

      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createEmpresaReport() {
      $filename = "Report_empresas_".date('Y-m-d_H-i-s');
      $download = new Download();
      $company = new CompanyModel(false, $this->DB);
      $pReport = $company->getCompanyReport();
      if(empty($pReport)) {

      }
      else {
          $download->report($pReport, false, $filename);
      }
    }
    function createEmpresaReportDownload() {
      $filename = "Report_empresas_".date('Y-m-d_H-i-s');
      $download = new Download();
      $company = new CompanyModel(false, $this->DB);
      $pReport = $company->getCompanyReport();
      if(empty($pReport)) {

      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createEmpresaReportZip() {
      $filename = "Report_empresas_".date('Y-m-d_H-i-s');
      $download = new Download();
      $company = new CompanyModel(false, $this->DB);
      $pReport = $company->getCompanyReport();
      if(empty($pReport)) {

      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createPlataformaReport() {
      $filename = "Report_pfp_".date('Y-m-d_H-i-s');
      $download = new Download();
      $wep = new WepModel(false, $this->DB);
      $pReport = $wep->getPlataformaReport();
      if(empty($pReport)) {

      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createPlataforaReportDownload() {
      $filename = "Report_pfp_".date('Y-m-d_H-i-s');
      $download = new Download();
      $wep = new WepModel(false, $this->DB);
      $pReport = $wep->getPlataformaReport();
      if(empty($pReport)) {

      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createPlataformaReportZip() {
      $filename = "Report_pfp_".date('Y-m-d_H-i-s');
      $download = new Download();
      $wep = new WepModel(false, $this->DB);
      $pReport = $wep->getPlataformaReport();
      if(empty($pReport)) {

      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createSectoresReport() {
      $filename = "Report_sectores_".date('Y-m-d_H-i-s');
      $download = new Download();
      $sector = new SectoresModel(false, $this->DB);
      $pReport = $sector->getSectoresReport();
      if(empty($pReport)) {

      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createSectoresReportDownload() {
      $filename = "Report_sectores_".date('Y-m-d_H-i-s');
      $download = new Download();
      $sector = new SectoresModel(false, $this->DB);
      $pReport = $sector->getSectoresReport();
      if(empty($pReport)) {

      }
      else {
          $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createSectoresReportZip() {
      $filename = "Report_sectores_".date('Y-m-d_H-i-s');
      $download = new Download();
      $sector = new SectoresModel(false, $this->DB);
      $pReport = $sector->getSectoresReport();
      if(empty($pReport)) {

      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createSocialReport() {
      $filename = "Report_socia_media_".date('Y-m-d_H-i-s');
      $download = new Download();
      $wup = new WebUserProyectos(false, $this->DB);
      $pReport = $wup->createSocialWupReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createSocialReportDownload() {
      $filename = "Reportes_socia_media_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pv = new WebUserProyectos(false, $this->DB);
      $pReport = $wup->createSocialWupReport();

      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createSocialReportZip() {
      $filename = "Reportes_socia_media_".date('Y-m-d_H-i-s');
      $download = new Download();
      $wup = new WebUserProyectos(false, $this->DB);
      $pReport = $wup->createSocialWupReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createValoracionesReport() {
      $filename = "Report_valoraciones_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pv = new ProjectValoracionesClass(false, $this->DB);
      $pReport = $pv->getSocialReports();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createValoracionesReportDownload() {
      $filename = "Reportes_valoraciones_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pv = new ProjectValoracionesClass(false, $this->DB);
      $pReport = $pv->getSocialReports();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createValoracionesReportZip() {
      $filename = "Reportes_valoraciones_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pv = new ProjectValoracionesClass(false, $this->DB);
      $pReport = $pv->getSocialReports();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createWebUserReport() {
      $filename = "Reportes_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $webUsers = new ReportesClass(false, $this->DB);
      $pReport = $webUsers->getReportesReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createWebUserReportsDownload() {
      $filename = "Reportes_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $webUsers = new ReportesClass(false, $this->DB);
      $pReport = $webUsers->getReportesReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createWebUserReportZip() {
      $filename = "Reportes_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $webUsers = new ReportesClass(false, $this->DB);
      $pReport = $pLike->getReportesReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createLikeReport() {
      $filename = "Reportes_me_gusta_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pLike = new ProjectMegustaClass(false, $this->DB);
      $pReport = $pLike->getMegustaReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createLikeReportsDownload() {
      $filename = "Reportes_me_gusta_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pLike = new ProjectMegustaClass(false, $this->DB);
      $pReport = $pLike->getMegustaReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createLikeReportZip() {
      $filename = "Reportes_me_gusta_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pLike = new ProjectMegustaClass(false, $this->DB);
      $pReport = $pLike->getMegustaReport();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function createWebUserListReport() {
      $filename = "Reportes_lista_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pUsers = new UserWeb(false, $this->DB);
      $pReport = $pUsers->getAllWebUsers();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->report($pReport, false, $filename);
      }
    }
    function createWebUserListReportDownload() {
      $filename = "Reportes_lista_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pUsers = new UserWeb(false, $this->DB);
      $pReport = $pUsers->getAllWebUsers();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->createSavedCSV($pReport, false, $filename);
      }
    }
    function createWebUserListReportZip() {
      $filename = "Reportes_lista_usuarios_web_".date('Y-m-d_H-i-s');
      $download = new Download();
      $pUsers = new UserWeb(false, $this->DB);
      $pReport = $pUsers->getAllWebUsers();
      if(empty($pReport)) {
        echo "<script type=\"text/javascript\">alert(\"No hay reportes\");</script>";
        $this->show();
      }
      else {
        $download->csvFile($pReport, false, $filename);
      }
    }

    function deleteExcelReport() {
      if(isset($_GET['r_file'])) {
        $filePath = BASEPATH . 'upload_reports/' . $_GET['r_file'];
        if(file_exists($filePath)) {
          unlink($filePath);
          $this->returnFormSuccess("Archivo borrado correctamente");
        }
        else {
          $this->returnFormError("Error al eliminar el archivo");
        }
      }
    }


  }
 ?>
